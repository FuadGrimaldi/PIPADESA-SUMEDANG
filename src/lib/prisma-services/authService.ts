import prisma from "./prisma";
import bcrypt from "bcrypt";

// Auth
export async function register(data: {
  username: string;
  email: string;
  password: string;
  nik: string;
  full_name: string;
}) {
  const { username, email, password, nik, full_name } = data;

  // 1. Cek apakah email sudah ada
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  // 2. Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Ambil desa pertama (sementara)
  const desa = await prisma.profile_desa.findFirst();
  if (!desa) throw new Error("Belum ada data desa");

  // 4. Simpan user baru
  const newUser = await prisma.users.create({
    data: {
      desa_id: desa.id,
      nik: nik, // kamu bisa generate atau input dari user
      username: username,
      full_name: full_name, // atau input sendiri
      email,
      password: hashedPassword,
      role: "masyarakat", // atau sesuai enum kamu
      status: "approved", // atau sesuai enum kamu
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function login(data: { email: string; password: string }) {
  // Cari user berdasarkan email
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  // Jika user ditemukan dan password ada
  if (user && user.password) {
    // Bandingkan hash dari kata sandi yang diberikan dengan hash yang tersimpan
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      // Jika cocok, kembalikan data pengguna tanpa kata sandi
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }

  // Jika user tidak ditemukan atau kata sandi tidak cocok, kembalikan null
  return null;
}
