export enum SaranaKategori {
  pendidikan = "pendidikan",
  kesehatan = "kesehatan",
  ibadah = "ibadah",
  olahraga = "olahraga",
  umum = "umum",
}

export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export interface Sarana {
  id: number;
  desa_id: number;
  kategori: SaranaKategori;
  nama_sarana: string;
  deskripsi: string;
  alamat_lokasi: string;
  koordinat_lat: string;
  koordinat_long: string;
  foto_path: string;
  status: Status;
}

export interface SaranaCreate {
  desa_id: number;
  kategori: SaranaKategori;
  nama_sarana: string;
  deskripsi: string;
  alamat_lokasi: string;
  koordinat_lat: string;
  koordinat_long: string;
  foto_path?: string; // optional
  status?: Status; // optional, defaultnya 'pending'
}

export interface SaranaUpdate {
  kategori?: SaranaKategori;
  nama_sarana?: string;
  deskripsi?: string;
  alamat_lokasi?: string;
  koordinat_lat?: string;
  koordinat_long?: string;
  foto_path?: string | null; // optional, bisa null
  status?: Status; // optional
}
