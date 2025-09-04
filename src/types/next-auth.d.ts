import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      desaId?: string | null;
      username?: string | null;
      name?: string | null; // Optional: include user name if available
      role?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    desaId?: string | null;
    username?: string | null;
    name?: string | null; // Optional: include user name if available
    role?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
