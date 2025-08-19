// Enums
export enum ArticleType {
  berita = "berita",
  agenda = "agenda",
  sakip = "sakip",
  sid = "sid",
  kegiatan = "kegiatan",
  pengumuman = "pengumuman",
}

export enum ArticleStatus {
  published = "published",
  draft = "draft",
}

// Main Article interface
export interface Article {
  id: number;
  user_id: number;
  desa_id: number;
  tipe: ArticleType; // pakai enum
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  dokumen_terkait_path: string | null;
  waktu_kegiatan: string | null; // ISO date string
  lokasi_kegiatan: string | null;
  status: ArticleStatus; // pakai enum
  published_at: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null; // optional, for include
  users?: {
    id: number;
    full_name: string;
  } | null; // optional, for include
}

// Create
export interface ArticleCreate {
  user_id: number;
  desa_id: number;
  tipe: ArticleType; // wajib enum
  title: string;
  slug: string;
  content: string;
  featured_image?: string | null;
  dokumen_terkait_path?: string | null;
  waktu_kegiatan?: string | null;
  lokasi_kegiatan?: string | null;
  status?: ArticleStatus; // enum
  published_at: string; // ISO date string
}

// Update
export interface ArticleUpdate {
  tipe?: ArticleType;
  title?: string;
  slug?: string;
  content?: string;
  featured_image?: string | null;
  dokumen_terkait_path?: string | null;
  waktu_kegiatan?: string | null; // ISO date string
  lokasi_kegiatan?: string | null;
  status?: ArticleStatus;
  published_at?: string; // ISO date string
}
