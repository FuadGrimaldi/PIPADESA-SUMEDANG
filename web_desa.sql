-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2025 at 03:14 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_desa`
--

-- --------------------------------------------------------

--
-- Table structure for table `agenda_desa`
--

CREATE TABLE `agenda_desa` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` enum('Kebudayaan','Olahraga','Umum','Peringatan_Hari_Besar','Sepedahan','Olahraga_Asik','PKK') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu` datetime(3) NOT NULL,
  `poster` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agenda_desa`
--

INSERT INTO `agenda_desa` (`id`, `desa_id`, `judul`, `slug`, `kategori`, `deskripsi`, `lokasi`, `waktu`, `poster`, `created_by`, `status`, `created_at`, `updated_at`) VALUES
(3, 423, 'Upacara Kemerdekaan Republik Indonesia', 'upacara', 'Peringatan_Hari_Besar', 'Presiden Prabowo Subianto memimpin langsung Upacara Peringatan Detik-Detik Proklamasi Kemerdekaan Republik Indonesia di halaman Istana Merdeka, Jakarta, pada Minggu, 17 Agustus 2025.', 'Lapangan cipeudeuy', '2025-08-17 02:36:00.000', '/assets/uploads/agenda/1755570995816-200786756.png', 1, 'approved', '2025-08-19 02:36:35.822', '2025-08-19 02:36:35.822'),
(4, 423, 'Wayang', 'wayang', 'Kebudayaan', 'Wayang mang acep', 'balai desa', '2025-08-29 02:38:00.000', '/assets/uploads/agenda/1755571103613-686720672.jpg', 1, 'approved', '2025-08-19 02:38:23.620', '2025-08-19 02:38:23.620'),
(6, 431, 'Pemotongan sapi hibah desa', 'sapi', 'Peringatan_Hari_Besar', 'Pemotongan sapi hasil hibah kecamtan kepada desa cikeusi', 'Balai desa', '2025-09-04 07:36:00.000', '/assets/default/image-not-available.png', 5, 'approved', '2025-09-06 14:36:58.498', '2025-09-06 14:38:22.797');

-- --------------------------------------------------------

--
-- Table structure for table `anggaran_apbdes`
--

CREATE TABLE `anggaran_apbdes` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `tahun_anggaran` year NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_pendapatan` decimal(15,2) NOT NULL,
  `total_belanja` decimal(15,2) NOT NULL,
  `dokumen_realisasi_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `infografis_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('direncanakan','realisasi') COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `desa_id` int NOT NULL,
  `tipe` enum('berita','agenda','sakip','sid','kegiatan','pengumuman') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_terkait_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu_kegiatan` datetime(3) NOT NULL,
  `lokasi_kegiatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('published','draft') COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `user_id`, `desa_id`, `tipe`, `title`, `slug`, `content`, `featured_image`, `dokumen_terkait_path`, `waktu_kegiatan`, `lokasi_kegiatan`, `status`, `published_at`, `created_at`, `updated_at`) VALUES
(4, 1, 423, 'berita', 'Anak pintar berhasil menciptakan VEO 3', 'veo-3', 'Veo 3 Fast (preview): Wujudkan ide Anda dalam video 8 detik dengan suara. Deskripsikan suatu adegan dan tambahkan detail seperti gaya visual yang diinginkan dan musik latar belakang.', '/assets/uploads/articles/1755510588529-180810216.jpg', '-', '2025-08-08 02:48:00.000', 'Desa Cipeundeuy', 'published', '2025-08-07 02:49:00.000', '2025-08-18 09:49:02.869', '2025-08-18 09:49:02.869'),
(5, 1, 423, 'berita', 'Kabupaten Sumedang Mendapat Dana Insentif Daerah (DID) di Tahun 2022 sebesar Rp. 37 miliar', 'dana-insentif', '<p>Bupati: Pemberian Penghargaan adalah Bonus dari Kerja Keras Atas berbagai raihan prestasi yang diperoleh sepanjang Tahun 2021, Kabupaten Sumedang mendapatkan apresiasi dari pemerintah pusat berupa Dana Insentif Daerah (DID) di Tahun 2022 sebesar Rp. 37 miliar dan merupakan yang terbesar di Jawa Barat. \"Alhamdulillah di Tahun 2022, sebagai penghargaan atas prestasi Sumedang, kita mendapatkan DID terbesar di Jabar yakni Rp 37 miliar, yang akan digunakan untuk membangun Sumedang, \" kata Bupati Dony Ahmad Munir dalam keterangannya, Minggu (2/1/2022). </p><p><br></p><p>Selain itu, lanjut Bupati, jumlah Dana Alokasi Khusus (DAK) dari pusat untuk pembangunan fisik berupa infrastruktur jalan di Sumedang meningkat jumlahnya mencapai Rp. 57 miliar dimana di Tahun 2021 hanya sebesar Rp. 4,3 miliar. \"B2PJN telah datang ke sumedang dan akan menuntaskan Jalan Lingkar Utara dari Karamat - Gunung Julang sampai dengan Pasir Ringkik. Insyaallah di Tahun 2022. Termasuk TPSA Cijeruk akan diselesaikan Tahun ini,\" katanya. Hal tersebut belum lagi ditambah dengan banyaknya Pemda dan lembaga lainnya yang datang untuk melakukan studi tiru ke Sumedang atas kemajuan yang diraih. \"Sepanjang Tahun 2021 ada 38 lembaga dan Pemda yang studi banding ke Sumedang. Tentunya ini meningkatkan hunian hotel, pendapatan rumah makan dan UMKM. Karena disyaratkan kalau ke Sumedang harus nginap di Sumedang, datang ke tempat wisata Sumedang, dan belanja produk UMKM Sumedang,\" tuturnya. </p><p><br></p><p>Menurut Bupati, turunnya berbagai dana tersebut ke Sumedang tidak lain karena berbagai raihan prestasi dan penghargaan yang diperoleh Sumedang, baik dari pemerintah pusat, provinsi maupun lembaga lainnya. \"Semuanya merupakan apresiasi atas kinerja kami. Kalau ada yang meragukan atas penghargaan tersebut hendaknya ditanyakan langsung kepada yang memberikannya,\" ujarnya. Ia menambahkan, raihan prestasi tersebut diharapkan menjadi kebanggaan warga Sumedang sekaligus motivasi bagi ASN Sumedang untuk bisa lebih meningkatkan kinerjanya. \"Tugas kami hanya bekerja sebaik baiknya sebagai kewajiban dan amanah yang diemban. Kalaupun ada penghargaan, itu adalah bonus bagi kami,\" ucapnya. Bupati menambahkan, secara makro capaian Kabupaten Sumedang di 2021 mengindikasikan ke arah yang lebih baik kendati dalam situasi pandemi Covid-19. \"Alhamdulillah IPM Sumedang naik. Indeks Gini alhamdulillah turun. Angka rata-rata lama sekolah dan harapan sekolah naik. </p><p><br></p><p>Pengangguran terbuka turun dari 9,89 ke 9,18 atau turun 0,71. Sedangkan provinsi dari 10, 46 ke 9,82 atau turun 0,64. Bahkan untuk Stunting turun drastis dari 32,4 % sekarang tinggal 11 %,\" ungkapnya. Meskipun demikian, Bupat juga mengakui masih banyak PR yang harus dituntaskan, khususnya penurunan angka kemiskinan. \"Untuk angka kemiskinan Sumedang memang naik 0,45 % dari tahun sebelumnya. Namun masih di bawah rata-rata provinsi jabar yang naiknya 0,97 %. Walaupun dibanding kabupaten kota lain prosentase kenaikannya lebih rendah, kita tetap berusaha keras bagaimana kemiskinan ini bisa turun,\" tuturnya.</p>', '/assets/uploads/articles/1755514714692-501189465.png', '-', '2025-08-11 13:57:00.000', 'Desa Cipeundeuy', 'published', '2025-08-17 13:58:00.000', '2025-08-18 10:58:34.697', '2025-08-18 10:58:34.697'),
(6, 1, 423, 'pengumuman', 'Upacara Kemerdekaan ke-80', 'Upacara Kemerdekaan ke-80', 'Upacara Kemerdekaan ke-80', '/assets/uploads/articles/1755516262171-578985323.png', '-', '2025-07-31 11:06:00.000', 'Desa Cipeundeuy', 'published', '2025-08-29 11:06:00.000', '2025-08-18 11:24:22.177', '2025-08-18 11:24:22.177'),
(8, 1, 423, 'berita', 'Kegiatan Pembukaan Jalan Usaha Tani - DESA CIPEUNDEUY', 'pembukaan-usaha-jalan', '<h1><strong>Desa Cipeundeuy</strong></h1><p><br></p><p>Kegiatan Pembukaan JUT (Jalan Usaha Tani) yang berlokasi di Dusun Nganceng Desa Cipeundeuy Kecamatan Jatinunggal.</p><p><br></p><p>Kegiatan ini dibiayai dari Anggaran Dana Desa Tahun 2021 dengan Nilai 20jt yang dilaksanakan dengan cara Padat Karya Tunai. Panjang rencana Jalan ini 900m dengan lebar 2,5m.</p>', '/assets/uploads/articles/1755578769172-186283079.jpg', '-', '2021-09-01 14:30:00.000', 'Desa Cipeundeuy', 'published', '2025-08-18 14:30:00.000', '2025-08-19 04:30:56.538', '2025-08-19 04:30:56.538'),
(9, 1, 423, 'berita', 'Macan ngamuk', 'macan', '<p><span style=\"color: rgb(31, 31, 31);\">Macan, ing basa Latin diarani Panthera tigris, iku sato kang kagolong kulawarga Felidae utawa jinis kucing. Macan lumrahé mburu mangsané nganggo cakar lan taringé. Macan mlayuné cépet banget. Mangsané macan kalebu kéwan kang rada gedhé, kaya ta rusa sambar, kidang, babi, lan kancil.</span></p>', '/assets/uploads/articles/1755579059616-474516371.jpg', '-', '2025-08-22 04:50:00.000', 'Desa Cipeundeuy', 'published', '2025-08-19 04:50:00.000', '2025-08-19 04:50:59.625', '2025-08-19 04:50:59.625'),
(10, 1, 423, 'kegiatan', 'Sosialisai (Penyuluhan) PTSL 2021 - DESA CIPEUNDEUY', 'kegiatan', '<p><span style=\"color: rgb(128, 128, 128);\">Pendaftaran Tanah Sistematis Lengkap (PTSL) Tim V Kantah Sumedang 2021</span></p>', '/assets/uploads/articles/1756696217317-224872230.png', '-', '2021-02-18 03:09:00.000', 'Desa Cipeundeuy', 'published', '2021-02-19 03:10:00.000', '2025-09-01 03:10:17.320', '2025-09-01 03:10:17.320'),
(16, 5, 431, 'berita', 'Fuad Ganteng', 'fuad', 'Fuad Ganteng banget ', '/assets/uploads/articles/1757159697970-378942371.jpg', '', '2025-09-02 21:51:00.000', 'Balai Desa', 'draft', '2025-09-05 21:51:00.000', '2025-09-06 11:51:53.555', '2025-09-06 11:51:53.555'),
(17, 1, 423, 'kegiatan', 'adsd', 'asd', '<p>assadadsdsadsd</p>', '/assets/default/image-not-available.png', 'aSAS', '2025-09-04 11:58:00.000', 'asdsa', 'draft', '2025-09-06 11:58:00.000', '2025-09-06 11:59:36.544', '2025-09-06 11:59:36.544'),
(18, 1, 423, 'kegiatan', 'dasdasdsa', 'fdsfd', '<p>zczxcx</p>', '/assets/default/image-not-available.png', 'dfgfgdf', '2025-09-01 05:04:00.000', 'zxczx', 'published', '2025-09-20 05:04:00.000', '2025-09-06 12:04:34.285', '2025-09-06 12:04:34.285');

-- --------------------------------------------------------

--
-- Table structure for table `infografis`
--

CREATE TABLE `infografis` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `infografis`
--

INSERT INTO `infografis` (`id`, `desa_id`, `title`, `gambar_path`) VALUES
(1, 423, 'Hak pemohon informasi', '/assets/uploads/infografis/1756088289848-970573622.jpg'),
(3, 423, 'KTP Rusak', '/assets/uploads/infografis/1756095361476-654170462.jpg'),
(4, 423, 'SDGs', '/assets/default/image-not-available.png'),
(5, 423, 'Pembuatan KK', '/assets/default/image-not-available.png');

-- --------------------------------------------------------

--
-- Table structure for table `instansi`
--

CREATE TABLE `instansi` (
  `id` int NOT NULL,
  `nama_instansi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_layanan`
--

CREATE TABLE `jadwal_layanan` (
  `id` int NOT NULL,
  `layanan_id` int NOT NULL,
  `hari` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jam_buka` time NOT NULL,
  `jam_tutup` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_organisasi`
--

CREATE TABLE `kategori_organisasi` (
  `id` int NOT NULL,
  `nama_kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desa_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori_organisasi`
--

INSERT INTO `kategori_organisasi` (`id`, `nama_kategori`, `desa_id`) VALUES
(5, 'umkm', 423),
(6, 'kepemudaan', 423),
(7, 'organisasi', 423),
(8, 'umkm', 431),
(11, 'Kepemudaan', 431);

-- --------------------------------------------------------

--
-- Table structure for table `keluarga`
--

CREATE TABLE `keluarga` (
  `id` int NOT NULL,
  `no_kk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kepala_keluarga` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desa_id` int NOT NULL,
  `alamat` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `sumber_listrik` enum('Listrik_PLN','Listrik_Non_PLN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `bahan_bakar_memasak` enum('Gas_3Kg_Lebih','Gas_3Kg','Gas_Kota_Biogas','Kayu_Bakar','Tidak_Memasak') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sumber_air_minum` enum('Lainnya','Air_Isi_Ulang','Leding_Meteran','Leding_Eceran','Sumur_Bor','Sumur_Terlindung','Sumur_Tak_Terlindung','Mata_Air_Terlindung','Mata_Air_Tak_Terlindung') COLLATE utf8mb4_unicode_ci NOT NULL,
  `pembuangan_tinja` enum('Belum_Mengisi','Tangki','SPAL','Lubang_Tanah','Kolam_Sawah','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_lantai` enum('Marmer','Keramik','Ubin','Kayu_Bagus','Semen','Bambu','Kayu_Jelek','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `kualitas_lantai` enum('Kualitas_Tinggi','Kualitas_Rendah') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_dinding` enum('Belum_Mengisi','Tembok','Plesteran','Kayu','Anyaman','Bambu','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `kualitas_dinding` enum('Kualitas_Tinggi','Kualitas_Rendah') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_atap` enum('Beton','Genteng_Keramik','Genteng_Metal','Genteng_Tanah_Liat','Asbes') COLLATE utf8mb4_unicode_ci NOT NULL,
  `kualitas_atap` enum('Kualitas_Tinggi','Kualitas_Rendah') COLLATE utf8mb4_unicode_ci NOT NULL,
  `aset_bergerak` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE `komentar` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `article_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`id`, `desa_id`, `article_id`, `name`, `email`, `no_telp`, `pesan`, `status`, `created_at`, `updated_at`) VALUES
(5, 423, 5, 'Bagus', 'gus@gmail.com', '0813123123123', 'Sumendang mantap', 'approved', '2025-08-28 10:16:34.000', '2025-08-28 10:16:35.000'),
(6, 423, 5, 'rio', 'yo@gmail.com', '081321323123', 'Bagus beritanya', 'approved', '2025-08-28 10:17:16.000', '2025-08-28 10:17:17.000'),
(7, 423, 4, 'zikria', 'zik@gmial.com', '98132312321', 'mantapuu', 'approved', '2025-08-28 10:17:54.000', '2025-08-28 10:17:55.000'),
(9, 423, 8, 'asdasd', 'asda@gmail.com', '019312313132', 'adsadsad', 'approved', '2025-08-28 04:02:45.759', '2025-08-28 04:02:45.759'),
(10, 431, 16, 'Fuad Grimaldi', 'asep12@gmail.com', '98132312321', 'Mantapn bangggggggg hojojojojojojoj', 'approved', '2025-09-08 10:35:55.343', '2025-09-08 10:35:55.343'),
(11, 423, 18, 'Fuad Grimaldi', 'fuadgrimaldi145@gmail.com', '08923131231', 'sdasdasdsdasds', 'approved', '2025-09-08 12:54:26.507', '2025-09-08 12:54:26.507');

-- --------------------------------------------------------

--
-- Table structure for table `layanan`
--

CREATE TABLE `layanan` (
  `id` int NOT NULL,
  `instansi_id` int NOT NULL,
  `nama_layanan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loket` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instansi_pelaksana` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `officials`
--

CREATE TABLE `officials` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `officials`
--

INSERT INTO `officials` (`id`, `desa_id`, `name`, `position`, `photo`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 423, 'Fuad Grimladi', 'Kepala Desa', '/assets/uploads/officials/1755510328872-744731278.jpg', 1, '2025-08-14 14:36:47.000', '2025-08-18 09:45:28.877'),
(2, 431, 'Regista', 'sekretaris', '/assets/default/default.png', 2, '2025-08-14 14:41:04.000', '2025-09-05 12:28:35.753'),
(5, 423, 'Fuad Grimaldi 2', 'seksid', '/assets/uploads/officials/1755160793356-176238634.jpg', 1, '2025-08-14 08:39:53.361', '2025-08-14 08:39:53.361'),
(6, 423, 'Fuad Grimaldi 3', 'Kadin', '/assets/uploads/officials/1755160818954-907519644.jpg', 1, '2025-08-14 08:40:18.957', '2025-08-14 08:40:18.957'),
(7, 423, 'Fuad Grimaldi 4', 'Kepala Desa', '/assets/default/default.png', 1, '2025-08-27 06:34:57.776', '2025-08-27 06:34:57.776'),
(8, 431, 'Ujang', 'Sekretaris', '/assets/uploads/officials/1757075355063-253846151.jpg', 1, '2025-09-05 12:29:15.069', '2025-09-05 12:29:15.069');

-- --------------------------------------------------------

--
-- Table structure for table `organisasi`
--

CREATE TABLE `organisasi` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `kategori_id` int NOT NULL,
  `nama_organisasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_ketua` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi_kegiatan` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organisasi`
--

INSERT INTO `organisasi` (`id`, `desa_id`, `kategori_id`, `nama_organisasi`, `nama_ketua`, `deskripsi_kegiatan`, `logo_path`) VALUES
(5, 423, 6, 'Pemuda Pancasila', 'M. Tahri Udin', 'Pemuda pancasila melindungu desa dari marabahaya', '/assets/uploads/organisasi/1755762715419-123489620.png'),
(6, 423, 5, 'Baso Cina', 'weng chun', 'Usaha baso menengah', '/assets/uploads/organisasi/1755778834634-797312855.png'),
(7, 431, 11, 'Pemuda Pancasila', 'ceu amih', 'Memperjuangkan hak segala bangsa', '/assets/uploads/organisasi/1755780424897-567767608.png'),
(8, 423, 6, 'Karang Taruna', 'Saefuloh', 'Kegiatan pemuda desa untuk mengembangkan talenta anak muda desa', '/assets/default/default.png'),
(9, 431, 8, 'Bajidor', 'Uung', 'Bajidor adalah umkm ', '/assets/default/default.png');

-- --------------------------------------------------------

--
-- Table structure for table `penduduk`
--

CREATE TABLE `penduduk` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `keluarga_id` int NOT NULL,
  `nik` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kelamin` enum('Laki_laki','Perempuan') COLLATE utf8mb4_unicode_ci NOT NULL,
  `umur` int NOT NULL,
  `status_perkawinan` enum('Belum_Kawin','Kawin','Cerai_Hidup','Cerai_Mati') COLLATE utf8mb4_unicode_ci NOT NULL,
  `agama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partisipasi_sekolah` enum('Tidak_Sekolah','Masih_Sekolah','Tidak_Bersekolah') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ijazah_tertinggi` enum('Belum_Mengisi','Tidak_Punya_Ijazah','SD_Sederajat','SMP_Sederajat','SMA_Sederajat','D1_D2_D3','D4_S1','S2_S3') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jaminan_kesehatan` enum('KKS_KPS','KIP_BSM','KIS_BPJS') COLLATE utf8mb4_unicode_ci NOT NULL,
  `disabilitas` enum('Belum_Mengisi','Tidak_Cacat','Tuna_Daksa','Cacat_Mental','Cacat_Fisik_Mental','Tuna_Netra','Tuna_Rungu','Tuna_Wicara','Tuna_Rungu_Netra_Cacat_Tubuh') COLLATE utf8mb4_unicode_ci NOT NULL,
  `penyakit_kronis` enum('Belum_Mengisi','Tidak_Ada','Hipertensi','Rematik','Asma','Masalah_Jantung','Diabetes','TBC','Stroke','Kanker','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_usaha` enum('Pertanian','Konstruksi','Perdagangan','Hotel_Restoran') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hubungan_dengan_kk` enum('Kepala_Keluarga','Istri','Anak','Orang_Tua','Anggota_Lain') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengaduan_aspirasi`
--

CREATE TABLE `pengaduan_aspirasi` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` enum('pengaduan','aspirasi') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `pengaduan_aspirasi`
--

INSERT INTO `pengaduan_aspirasi` (`id`, `desa_id`, `name`, `email`, `no_telp`, `pesan`, `kategori`, `status`, `created_at`, `updated_at`) VALUES
(1, 423, 'Zikri', 'zx@gmail.com', '08923131231', 'Tolong kepada aparatur desa untuk disiplin lagi', 'pengaduan', 'approved', '2025-08-28 11:24:18.000', '2025-08-28 07:29:13.963'),
(2, 423, 'Rio', 'yo@gmail.com', '09913881232123', 'Saya sebagai warga desa cipeundeuy ingin menyarankan agar setiap agustus di bentuk lomba bola antar rw untuk memeriahkan acara kemerdekaan', 'aspirasi', 'rejected', '2025-08-28 11:25:49.000', '2025-08-28 07:31:23.015'),
(3, 423, 'Fuad Grimaldi', 'fuad@gmail.com', '019312313132', 'Terdapat pungli/bayar parkir di area parkiran desa', 'pengaduan', 'approved', '2025-08-28 04:37:50.279', '2025-08-28 04:37:50.279'),
(5, 431, 'Rizal', 'riz@gmail.com', '098777771212', 'Pelayanan publik sangat lambat, tolong diperbaiki lagi. Terima kasih.', 'pengaduan', 'approved', '2025-09-02 07:37:53.026', '2025-09-02 07:38:51.955'),
(6, 431, 'Fuad Grimaldi', 'fuad@gmail.com', '98132312321', 'Mohon jalan diperbaiki di gang xxxx', 'pengaduan', 'approved', '2025-09-08 10:56:15.161', '2025-09-08 10:56:59.363'),
(7, 423, 'Hutami', 'hutami@gmail.com', '813123132123', 'Kita perlu pergantian kepala desa', 'aspirasi', 'pending', '2025-09-08 12:38:23.586', '2025-09-08 12:38:23.586');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_proposal`
--

CREATE TABLE `pengajuan_proposal` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `desa_id` int NOT NULL,
  `judul_pengajuan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` enum('Bantuan_Sosial','Pembangunan_Fisik','Kegiatan_Masyarakat','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggapan_admin` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `persyaratan_layanan`
--

CREATE TABLE `persyaratan_layanan` (
  `id` int NOT NULL,
  `layanan_id` int NOT NULL,
  `nama_persyaratan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile_desa`
--

CREATE TABLE `profile_desa` (
  `id` int NOT NULL,
  `subdomain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_desa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `twitter` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_depan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `misi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tujuan` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `sejarah` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `gmaps_embed_url` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile_desa`
--

INSERT INTO `profile_desa` (`id`, `subdomain`, `nama_desa`, `alamat`, `telepon`, `email`, `twitter`, `instagram`, `visi`, `foto_depan`, `misi`, `tujuan`, `sejarah`, `gmaps_embed_url`, `lat`, `lng`, `created_at`, `updated_at`) VALUES
(423, 'cipeundeuy', 'Desa Cipeundeuy', 'Jl. Raya Cipeundeuy No. 1, Kecamatan Cipeundeuy', '021-12345678', 'cipeundeuy@gmail.com', '@DesaCipeundeuy', '@desa_cipeundeuy', 'Cipeundeuy “Bermartabat” bermusyawarah dalam mengambil keputusan, mari kita bersama membangun desa, taati aturan pemerintahnya, bahu membahu dan gotong royong terus lestarikan, taat beribadah harus diutamakan.', '/assets/uploads/profile-desa/1755589234632-244109455.jpg', 'Menjadikan pemerintah desa cipeundeuy yang jujur, bebas dari korupsi, transparan dan terbuka di segala bidang.', 'mewujudkan desa cipeundeuy yang mandiri, maju, sejahtera, adil dan berkeadilan.', 'Cipeundeuy terletak antara desa kirisik dan desa cimanintin,dan berbatasan lansung dengan cimanintim.\r\nDikatakan berbatasan dengan Desa Cimanintin karena Cimanintin merupakan desa paling ujung, kabupaten sumedang, sebab berbatasan dengan Kab. Majalengka. Cipeundeuy merupakan desa yang masih sejuk, sebab masih banyaknya pepohonan, dan diadakannya penghijauan.', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31685.06562418816!2d108.16904087689134!3d-6.934367954122555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f31b2d0b6ea2b%3A0xf60aca0ff9714606!2sCipeundeuy%2C%20Kec.%20Jatinunggal%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1755144792376!5m2!1sid!2sid', -6.1234563451321, 106.123412312234, '2025-08-14 03:36:22.949', '2025-08-19 07:40:34.635'),
(431, 'cikeusi', 'Desa Cikeusi', 'Jalan Raya Barat Darmaraja Dusun Andir Desa Cikeusi Kecamatan Darmaraja', '087-23123212', 'desacikeusi123@gmail.com', '@desacikeusi', 'instagram.com/desa_cikeusi/', 'Bersama membangun Desa Cikeusi “TERBAIK” (Transfaran, Empati, Religius, Berprestasi, Aspirtif, Inovatif, Kekeluargaan', '/assets/default/image-not-available.png', 'Transfaransi Mengedepankan keterbukaan dalam bidang pemerintahan, bidang anggaran dan keuangan dengan masyarakat, sehingga masyarakat dapat mengawasi dan adanya kontrol untuk menciptakan pemerintahan yang baik.', 'Dengan menjaga dan melestarikan sumber daya alam dan lingkungan hidup diharapkan alam desa cikeusi slalu terjaga kelestariannya yang akan menghasilkan lingkungan yang aman dan nyaman.', 'Desa Cikeusi merupakan sebuah desa yang berada di Kecamatan Darmaraja. Lokasinya berada di sebelah barat daya ibu kota kecamatan, dengan jarak sekitar 3 kilometer. Jika dirunut berdasarkan sejarahnya, Desa Cikeusi merupakan desa yang cukup tua. Desa ini sudah terbentuk sejak tahun 1801 dengan kepala desanya bernama Jaham yang menjabat dari tahun 1801 sampai 1831.', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.577656448524!2d108.04457929046124!3d-6.903228637260612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f2d519da96e19%3A0xea5d6deb5670cd58!2sCikeusi%2C%20Kec.%20Darmaraja%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1755671787806!5m2!1sid!2sid', 2342.23423, 23423.234234, '2025-08-14 11:42:00.000', '2025-08-14 11:42:01.000');

-- --------------------------------------------------------

--
-- Table structure for table `profil_masyarakat`
--

CREATE TABLE `profil_masyarakat` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `tempat_lahir` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_lahir` datetime(3) NOT NULL,
  `jenis_kelamin` enum('L','P') COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `agama` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_perkawinan` enum('Belum_Kawin','Kawin','Cerai_Hidup','Cerai_Mati') COLLATE utf8mb4_unicode_ci NOT NULL,
  `pekerjaan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pendidikan_terakhir` enum('Belum_Mengisi','Tidak_Punya_Ijazah','SD_Sederajat','SMP_Sederajat','SMA_Sederajat','D1_D2_D3','D4_S1','S2_S3') COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sarana_prasarana`
--

CREATE TABLE `sarana_prasarana` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `kategori` enum('pendidikan','kesehatan','ibadah','olahraga','umum','wisata') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_sarana` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_lokasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `koordinat_lat` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `koordinat_long` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unggulan` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sarana_prasarana`
--

INSERT INTO `sarana_prasarana` (`id`, `desa_id`, `kategori`, `nama_sarana`, `deskripsi`, `alamat_lokasi`, `koordinat_lat`, `koordinat_long`, `foto_path`, `unggulan`, `status`) VALUES
(1, 423, 'kesehatan', 'Posyandu ', 'Tempat pemeriksaan ibu hamil dan anak kecil', 'cikeusi, kecamatan darmaraja kab sumendag', '12314', '123123', '/assets/default/image-not-available.png', 'N', 'approved'),
(2, 423, 'ibadah', 'Mesjid Jami Abu Fawaaz', 'Masjid Jami Abu Fawaaz Dusun Karanganyar', 'Dusun Karanganyar RT.001 RW.006', '89.99999743874082', '-6.930531166253098', '/assets/uploads/sarana/1756195568153-666677284.png', 'N', 'approved'),
(3, 423, 'olahraga', 'Lapang Sepak Bola', 'Lapangan sepak bola', 'Dusun Cinangsi, Cipeundeuy, Kec. Jatinunggal, Kabupaten Sumedang, Jawa Barat 45376', '-6.942561034671354', '108.19661441367454', '/assets/default/image-not-available.png', 'N', 'approved'),
(5, 423, 'ibadah', 'Mesjid Jami attaubah', 'Masjid jami attabah ', 'Cipeundeuy, Kec. Jatinunggal, Kabupaten Sumedang, Jawa Barat', '', '', '/assets/uploads/sarana/1756195552838-378675669.png', 'N', 'pending'),
(6, 423, 'olahraga', 'Lapang Voli Mekarjaya Cidarma', 'Lapangan voli yang digunakan untuk warga desa cipeundeuy', 'Cipeundeuy, Kec. Jatinunggal, Kabupaten Sumedang, Jawa Barat 45376', '-6.922947279290411', '108.18580312069336', '/assets/sarana/1756195960931-376409966.png', 'N', 'approved'),
(7, 423, 'wisata', 'Curug cigorobog', 'Curug yang terletak di desa cipeundeuy', 'Cipeundeuy, Kec. Jatinunggal, Kabupaten Sumedang, Jawa Barat', '-6.922947279290411', '108.18580312069336', '/assets/uploads/sarana/1756268516856-557087331.png', 'N', 'approved'),
(9, 423, 'wisata', 'Air panas cipeundeuy', 'air panas asli desa cipeundeuy', 'Cipeundeuy, Kec. Jatinunggal, Kabupaten Sumedang, Jawa Barat', '-6.922947279290411', '108.18580312069336', '/assets/sarana/1756264904568-493900016.png', 'Y', 'approved'),
(14, 431, 'kesehatan', 'Klinik Bersalin', 'Klinik bersalin tempat melahirkan', 'Citembong girang', '123123', '123223', '/assets/uploads/sarana/1757325767813-461127219.png', 'N', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `sdgs`
--

CREATE TABLE `sdgs` (
  `id` int NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `sdgs`
--

INSERT INTO `sdgs` (`id`, `title`, `image`) VALUES
(1, 'Desa Tanpa Kemiskinan', '/assets/sdgs/skor-sdgs-1.jpg'),
(2, 'Desa Tanpa Kelaparan', '/assets/sdgs/skor-sdgs-2.jpg'),
(3, 'Desa Sehat dan Sejahtera', '/assets/sdgs/skor-sdgs-3.jpg'),
(4, 'Pendidikan Desa Berkualitas', '/assets/sdgs/skor-sdgs-4.jpg'),
(5, 'Keterlibatan Perempuan Desa', '/assets/sdgs/skor-sdgs-5.jpg'),
(6, 'Desa Layak Air Bersih dan Sanitasi', '/assets/sdgs/skor-sdgs-6.jpg'),
(7, 'Desa Berenergi Bersih dan Terbarukan', '/assets/sdgs/skor-sdgs-7.jpg'),
(8, 'Pertumbuhan Ekonomi Desa Merata', '/assets/sdgs/skor-sdgs-8.jpg'),
(9, 'Infrastruktur dan Inovasi Desa Sesuai Kebutuhan', '/assets/sdgs/skor-sdgs-9.jpg'),
(10, 'Desa Tanpa Kesenjangan', '/assets/sdgs/skor-sdgs-10.jpg'),
(11, 'Kawasan Pemukiman Desa Aman dan Nyaman', '/assets/sdgs/skor-sdgs-11.jpg'),
(12, 'Konsumsi dan Produksi Desa Sadar Lingkungan', '/assets/sdgs/skor-sdgs-12.jpg'),
(13, 'Desa Tanggap Perubahan Iklim', '/assets/sdgs/skor-sdgs-13.jpg'),
(14, 'Desa Peduli Lingkungan Laut', '/assets/sdgs/skor-sdgs-14.jpg'),
(15, 'Desa Peduli Lingkungan Darat', '/assets/sdgs/skor-sdgs-15.jpg'),
(16, 'Desa Damai Berkeadilan', '/assets/sdgs/skor-sdgs-16.jpg'),
(17, 'Kemitraan Untuk Pembangunan Desa', '/assets/sdgs/skor-sdgs-17.jpg'),
(18, 'Kelembagaan Desa Dinamis dan Budaya Desa Adaptif', '/assets/sdgs/skor-sdgs-18.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sdgsscore`
--

CREATE TABLE `sdgsscore` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `sdgs_id` int NOT NULL,
  `score` double DEFAULT NULL,
  `tahun` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `sdgsscore`
--

INSERT INTO `sdgsscore` (`id`, `desa_id`, `sdgs_id`, `score`, `tahun`) VALUES
(1, 423, 1, 89.1, 2025),
(2, 423, 2, 12.1, 2025),
(3, 431, 1, 87, 2024),
(5, 423, 3, 78, 2025),
(6, 431, 4, 33, 2025);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `desa_id` int DEFAULT NULL,
  `nik` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin_desa','masyarakat','admin_kab') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `desa_id`, `nik`, `username`, `full_name`, `email`, `password`, `role`, `status`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, 423, '1234567890123456', 'AdminCipeundeuy', 'Admin Desa Cipeundeuy', 'admincipeundeuy@gmail.com', '$2b$10$.1KF62esCrZ/oDmPgS2yA.ik8BwCl6fwSnuoCm5Zvexd6kEZEpDZ6', 'admin_desa', 'approved', NULL, '2025-08-14 03:36:31.657', '2025-08-14 03:36:31.657'),
(5, 431, '1234567890123156', 'AdminCikeusi2', 'Admin Desa cikeusi', 'admincikeusi@gmail.com', '$2b$10$XqG01Mg/7Do9q6YqONe6O.RulSZGz99oB4m/East.avFjKEyz5nKC', 'admin_desa', 'approved', NULL, '2025-08-14 04:43:32.777', '2025-08-14 04:43:32.777'),
(6, NULL, '9876543210987654', 'AdminKabupaten', 'Admin Kabupaten', 'adminkabupaten@gmail.com', '$2b$10$QuVaPHhTr2csdhOD6i1qduTGj0p27loc.e488WKpjCm2cNiBf0vgi', 'admin_kab', 'approved', NULL, '2025-09-04 03:45:20.397', '2025-09-04 03:45:20.397'),
(8, 431, '3211030811030001', 'fuad.grimaldi', 'Fuad Grimaldi', 'fuad@gmail.com', '$2b$10$5FbMdNWUJjRv0KhqEEeIfuw2Qpd6YVlfm0LgvGYA8W3do2B074qp2', 'admin_desa', 'approved', NULL, '2025-09-05 13:18:12.868', '2025-09-05 13:25:19.282');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int NOT NULL,
  `desa_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `embed_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `categori` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `desa_id`, `title`, `embed_url`, `deskripsi`, `categori`, `uploaded_at`, `created_at`, `updated_at`) VALUES
(1, 423, 'SI JUKI ANAK KOSAN : DUNIA BANJIR JUKI', 'https://youtu.be/E17xg_xDKE0?si=0W286osLoV0gurFa', 'Juki Dkk harus memastikan agar banjir tahunan tetap datang agar festival banjir tetap terlaksana.', 'Animasi', '2025-09-02 11:00:23.000', '2025-09-02 11:00:24.000', '2025-09-02 11:00:26.000'),
(2, 423, 'SI JUKI ANAK KOSAN : TUKAR GAYA', 'https://www.youtube.com/watch?v=_tg7ITwFJQ4', 'Juki dan Bedu saling bertukar gaya rambut dan mendapatkan bahwa keberuntungan mereka pun ikut tertukar.', 'Animasi', '2025-09-02 11:01:27.000', '2025-09-02 11:01:29.000', '2025-09-02 11:01:30.000'),
(3, 423, 'SI JUKI ANAK KOSAN : LUKISAN ABSTRAK CORO', 'https://www.youtube.com/watch?v=AUEObyLq3Aw', 'Seorang kolektor membeli lukisan Juki dengan harga mahal. Ketika lukisan dirusak oleh Coro, Juki harus memperbaikinya sebelum sang pembeli datang.', 'pariwisata', '2025-09-02 04:02:00.000', '2025-09-02 11:02:16.000', '2025-09-02 11:02:17.000'),
(4, 423, 'SI JUKI ANAK KOSAN : ACTION FIGURE SONI', 'https://www.youtube.com/watch?v=Ra5VN51V9Tk', 'Juki membawa Soni ke Mbah Gendeng untuk memperbaiki action figure nya, namun kekuatan dukun itu malah membuat mainan menjadi hidup', 'Animasi', '2025-09-02 04:32:00.000', '2025-09-02 04:38:59.391', '2025-09-02 04:38:59.391');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agenda_desa`
--
ALTER TABLE `agenda_desa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `agenda_desa_slug_key` (`slug`),
  ADD KEY `agenda_desa_desa_id_fkey` (`desa_id`),
  ADD KEY `agenda_desa_created_by_fkey` (`created_by`);

--
-- Indexes for table `anggaran_apbdes`
--
ALTER TABLE `anggaran_apbdes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anggaran_apbdes_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_slug_key` (`slug`),
  ADD KEY `articles_user_id_fkey` (`user_id`),
  ADD KEY `articles_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `infografis`
--
ALTER TABLE `infografis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `potensi_desa_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `instansi`
--
ALTER TABLE `instansi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal_layanan`
--
ALTER TABLE `jadwal_layanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jadwal_layanan_layanan_id_fkey` (`layanan_id`);

--
-- Indexes for table `kategori_organisasi`
--
ALTER TABLE `kategori_organisasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desa_id` (`desa_id`);

--
-- Indexes for table `keluarga`
--
ALTER TABLE `keluarga`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `keluarga_no_kk_key` (`no_kk`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `desa_id` (`desa_id`);

--
-- Indexes for table `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layanan_instansi_id_fkey` (`instansi_id`);

--
-- Indexes for table `officials`
--
ALTER TABLE `officials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `officials_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `organisasi`
--
ALTER TABLE `organisasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organisasi_desa_id_fkey` (`desa_id`),
  ADD KEY `organisasi_kategori_id_fkey` (`kategori_id`);

--
-- Indexes for table `penduduk`
--
ALTER TABLE `penduduk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `penduduk_nik_key` (`nik`),
  ADD KEY `penduduk_desa_id_fkey` (`desa_id`),
  ADD KEY `penduduk_keluarga_id_fkey` (`keluarga_id`);

--
-- Indexes for table `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desa_id` (`desa_id`);

--
-- Indexes for table `pengajuan_proposal`
--
ALTER TABLE `pengajuan_proposal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengajuan_proposal_user_id_fkey` (`user_id`),
  ADD KEY `pengajuan_proposal_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `persyaratan_layanan`
--
ALTER TABLE `persyaratan_layanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persyaratan_layanan_layanan_id_fkey` (`layanan_id`);

--
-- Indexes for table `profile_desa`
--
ALTER TABLE `profile_desa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profil_masyarakat`
--
ALTER TABLE `profil_masyarakat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profil_masyarakat_user_id_key` (`user_id`);

--
-- Indexes for table `sarana_prasarana`
--
ALTER TABLE `sarana_prasarana`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sarana_prasarana_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `sdgs`
--
ALTER TABLE `sdgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdgsscore`
--
ALTER TABLE `sdgsscore`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desa_id` (`desa_id`),
  ADD KEY `sdgs_id` (`sdgs_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_nik_key` (`nik`),
  ADD UNIQUE KEY `users_username_key` (`username`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_desa_id_fkey` (`desa_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_desa_id_fkey` (`desa_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agenda_desa`
--
ALTER TABLE `agenda_desa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `anggaran_apbdes`
--
ALTER TABLE `anggaran_apbdes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `infografis`
--
ALTER TABLE `infografis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `instansi`
--
ALTER TABLE `instansi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jadwal_layanan`
--
ALTER TABLE `jadwal_layanan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_organisasi`
--
ALTER TABLE `kategori_organisasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `keluarga`
--
ALTER TABLE `keluarga`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `officials`
--
ALTER TABLE `officials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `organisasi`
--
ALTER TABLE `organisasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `penduduk`
--
ALTER TABLE `penduduk`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pengajuan_proposal`
--
ALTER TABLE `pengajuan_proposal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persyaratan_layanan`
--
ALTER TABLE `persyaratan_layanan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profile_desa`
--
ALTER TABLE `profile_desa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=434;

--
-- AUTO_INCREMENT for table `profil_masyarakat`
--
ALTER TABLE `profil_masyarakat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sarana_prasarana`
--
ALTER TABLE `sarana_prasarana`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `sdgs`
--
ALTER TABLE `sdgs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sdgsscore`
--
ALTER TABLE `sdgsscore`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agenda_desa`
--
ALTER TABLE `agenda_desa`
  ADD CONSTRAINT `agenda_desa_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_desa_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `anggaran_apbdes`
--
ALTER TABLE `anggaran_apbdes`
  ADD CONSTRAINT `anggaran_apbdes_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `infografis`
--
ALTER TABLE `infografis`
  ADD CONSTRAINT `potensi_desa_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `jadwal_layanan`
--
ALTER TABLE `jadwal_layanan`
  ADD CONSTRAINT `jadwal_layanan_layanan_id_fkey` FOREIGN KEY (`layanan_id`) REFERENCES `layanan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `kategori_organisasi`
--
ALTER TABLE `kategori_organisasi`
  ADD CONSTRAINT `FK_kategori_organisasi_profile_desa` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`);

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `FK_komentar_articles` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_komentar_profile_desa` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `layanan`
--
ALTER TABLE `layanan`
  ADD CONSTRAINT `layanan_instansi_id_fkey` FOREIGN KEY (`instansi_id`) REFERENCES `instansi` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `officials`
--
ALTER TABLE `officials`
  ADD CONSTRAINT `officials_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `organisasi`
--
ALTER TABLE `organisasi`
  ADD CONSTRAINT `organisasi_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `organisasi_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_organisasi` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `penduduk`
--
ALTER TABLE `penduduk`
  ADD CONSTRAINT `penduduk_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `penduduk_keluarga_id_fkey` FOREIGN KEY (`keluarga_id`) REFERENCES `keluarga` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  ADD CONSTRAINT `FK__profile_desa` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `pengajuan_proposal`
--
ALTER TABLE `pengajuan_proposal`
  ADD CONSTRAINT `pengajuan_proposal_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `pengajuan_proposal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `persyaratan_layanan`
--
ALTER TABLE `persyaratan_layanan`
  ADD CONSTRAINT `persyaratan_layanan_layanan_id_fkey` FOREIGN KEY (`layanan_id`) REFERENCES `layanan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `profil_masyarakat`
--
ALTER TABLE `profil_masyarakat`
  ADD CONSTRAINT `profil_masyarakat_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `sarana_prasarana`
--
ALTER TABLE `sarana_prasarana`
  ADD CONSTRAINT `sarana_prasarana_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `sdgsscore`
--
ALTER TABLE `sdgsscore`
  ADD CONSTRAINT `FK_sdgsscore_profile_desa` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_sdgsscore_sdgs` FOREIGN KEY (`sdgs_id`) REFERENCES `sdgs` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `profile_desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
