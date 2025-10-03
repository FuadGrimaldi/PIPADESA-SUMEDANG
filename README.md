# 🌐 Web Desa Multi-Tenant Kabupaten Sumedang

[![Lisensi: MIT](https://img.shields.io/badge/Lisensi-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NEXTJS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)]()

## 📝 Deskripsi Proyek

Proyek ini merupakan **redesign website desa** untuk Kabupaten Sumedang dengan mengimplementasikan **arsitektur multi-tenant**. Sistem ini memungkinkan setiap desa memiliki website informasinya sendiri secara dinamis melalui subdomain unik (misalnya: `desaciptasari.sumedangkab.go.id`), namun tetap menggunakan satu basis kode (template) dan database yang terpusat.

Pendekatan ini menyederhanakan proses pemeliharaan, pembaruan, dan pengelolaan website untuk puluhan hingga ratusan desa secara efisien.

---

## ✨ Fitur Utama

- **Arsitektur Multi-Tenant**: Satu aplikasi untuk melayani banyak website desa, diidentifikasi melalui subdomain.
- **Konten Dinamis**: Setiap desa dapat mengelola kontennya sendiri, seperti berita, profil desa, galeri, dan informasi publik lainnya.
- **Desain Modern & Responsif**: Dibangun dengan Tailwind CSS untuk tampilan yang optimal di berbagai perangkat (desktop, tablet, dan mobile).
- **Setup Mudah dengan Docker**: Seluruh lingkungan pengembangan (aplikasi & database) dapat dijalankan dengan satu perintah menggunakan Docker.
- **Slider Interaktif**: Menggunakan SwiperJS untuk galeri foto dan slider konten yang menarik.

---

## 🛠️ Teknologi yang Digunakan

| Kategori               | Teknologi                                                                                                           |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Frontend & Backend** | [NextJS](), [Vite](https://vitejs.dev/), [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Database**           | [MySQL](https://www.mysql.com/)                                                                                     |
| **DevOps**             | [Docker](https://www.docker.com/)                                                                                   |
| **Ikon & Aset**        | [Font Awesome](https://fontawesome.com/icons), [SwiperJS](https://swiperjs.com/)                                    |

---

## 🚀 Instalasi & Konfigurasi Lokal

Pastikan semua prasyarat di bawah ini sudah terpasang di mesin Anda sebelum melanjutkan.

### Prasyarat

- [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
- [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose
- [Git](https://git-scm.com/)
- [Mysql]()

### Langkah-langkah Instalasi

#### 1. Clone Repository

Buka terminal Anda dan clone repository ini ke direktori lokal.

```bash
git clone https://github.com/FuadGrimaldi/PIPADESA-SUMEDANG.git
cd PIPADESA-SUMEDANG
```

#### 2. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`. File ini berisi semua variabel lingkungan yang dibutuhkan oleh aplikasi.

```bash
cp .env.example .env
```

Selanjutnya, buka file `.env` dan sesuaikan nilainya, terutama untuk koneksi database.

```env
# Contoh isi file .env
DATABASE_URL= #"mysql://user:password@host:port/db_name"
NEXTAUTH_SECRET= #random string, you can generate one with `openssl rand -base64 32`
NEXTAUTH_URL= #url website
NODE_ENV= #"development" or "production"
```

#### 3a. Jalankan secara lokal development

Metode ini menjalankan di local

- install npm

```bash
npm install
```

- generate random string

```bash
openssl rand -base64 32
```

- import database (web_desa.sql), terdapat migrate tapi sebatas user dan profile desa

- Jalankan

```bash
npm run dev
```

#### 3b. Jalankan dengan Docker (Metode Rekomendasi)

Metode ini akan secara otomatis membuat dan menjalankan kontainer untuk aplikasi Node.js dan database MySQL. Ini adalah cara termudah untuk memulai.

```bash
docker-compose up --build -d
```

- Aplikasi akan berjalan di `http://localhost:5173`.
- Database MySQL akan terekspos di port yang Anda definisikan di `docker-compose.yml`.

#### 4. akses url

- Aplikasi dapat diakses melalui `http://localhost:5173`.

---

## 🙏 Acknowledgements

Proyek ini terinspirasi dan menggunakan beberapa library hebat dari komunitas open-source. Terima kasih kepada:

- [Font Awesome](https://fontawesome.com/icons) untuk ikonografi.
- [Tailwind CSS](https://tailwindcss.com/) untuk utility-first CSS framework.
- [SwiperJS](https://swiperjs.com/) untuk slider yang powerful.
- Komunitas developer di GitHub, LinkedIn, dan internet atas berbagai aset dan inspirasi.
