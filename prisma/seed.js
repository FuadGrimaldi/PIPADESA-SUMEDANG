const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Cari profile_desa pertama
  const desa = await prisma.profile_desa.findFirst();

  if (!desa) {
    console.log("No desa found. Please add a desa first.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.users.create({
    data: {
      desa_id: null,
      nik: "9876543210987654",
      username: "AdminKabupaten",
      full_name: "Admin Kabupaten",
      email: "adminkabupaten@gmail.com",
      password: hashedPassword,
      role: "admin_kab", // enum Role
      status: "approved", // enum Status
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log("Admin user inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
