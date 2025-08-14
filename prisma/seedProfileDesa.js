const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.profile_desa.create({
    data: {
      subdomain: "cipeundeuy",
      nama_desa: "Desa Cipeundeuy",
      alamat: "Jl. Raya Cipeundeuy No. 1, Kecamatan Cipeundeuy",
      telepon: "021-12345678",
      email: "cipeundeuy@gmail.com",
      twitter: "@DesaCipeundeuy",
      instagram: "@desa_cipeundeuy",
      visi: "CIPEUNDEUY “BERMARTABAT” BERMUSYAWARAH DALAM MENGAMBIL KEPUTUSAN, MARI KITA BERSAMA MEMBANGUN DESA, TAATI ATURAN PEMERINTAHNYA, BAHU MEMBAHU DAN GOTONG ROYONG TERUS LESTARIKAN, TAAT BERIBADAH HARUS DI UTAMAKAN.",
      misi: "Menjadikan pemerintah desa cipeundeuy yang jujur, bebas dari korupsi, transparan dan terbuka di segala bidang.",
      tujuan:
        "mewujudkan desa cipeundeuy yang mandiri, maju, sejahtera, adil dan berkeadilan.",
      gmaps_embed_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.1234567890123!2d106.12345678901234!3d-6.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e12345678901234%3A0x1234567890123456!2sDesa%20Cipeundeuy!5e0!3m2!1sid!2sid!4v1612345678901",
      lat: -6.1234563451321,
      lng: 106.123412312234,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log("first desa inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
