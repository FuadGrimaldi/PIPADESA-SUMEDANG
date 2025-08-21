export interface Organisasi {
  id: number;
  desa_id: number;
  kategori_id: number;
  nama_organisasi: string;
  nama_ketua: string;
  deskripsi_kegiatan: string;
  logo_path?: string | null;
  profile_desa: ProfileDesa;
  kategori_organisasi: KategoriOrganisasi;
}
export interface OrganisasiCreate {
  nama_organisasi: string;
  desa_id: number;
  kategori_id: number;
  nama_ketua?: string;
  deskripsi_kegiatan?: string;
  logo_path?: string | null; // optional, bisa null
}
export interface OrganisasiUpdate {
  nama_organisasi?: string;
  desa_id?: number;
  kategori_id?: number;
  nama_ketua?: string;
  deskripsi_kegiatan?: string;
  logo_path?: string | null; // optional, bisa null
}

export interface ProfileDesa {
  id: number;
  nama_desa: string;
  // tambahkan properti lain sesuai kebutuhan
}

export interface KategoriOrganisasi {
  id: number;
  nama_kategori: string;
  // tambahkan properti lain sesuai kebutuhan
}

export interface KategoriOrganisasiCreate {
  nama_kategori: string;
  desa_id: number;
}
