import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        subdomainDesaId: { label: "Subdomain Desa ID", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { email, password, subdomainDesaId } = credentials;

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (user && user.password) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            if (user.desa_id && user.desa_id.toString() !== subdomainDesaId) {
              // Jika desa_id tidak sesuai dengan subdomainDesaId, tolak login
              return null;
            }
            return {
              id: user.id.toString(), // Convert BigInt to string
              desaId: user.desa_id ? user.desa_id.toString() : null,
              email: user.email,
              name: user.full_name,
              role: user.role,
              username: user.username,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.desaId = user.desaId ?? null;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.desaId = (token.desaId as string) ?? null;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
