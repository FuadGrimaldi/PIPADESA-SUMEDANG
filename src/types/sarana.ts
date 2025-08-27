export enum SaranaKategori {
  pendidikan = "pendidikan",
  kesehatan = "kesehatan",
  ibadah = "ibadah",
  olahraga = "olahraga",
  umum = "umum",
  wisata = "wisata",
}

export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum SaranaWisataUnggulan {
  Y = "Y",
  N = "N",
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
  unggulan: SaranaWisataUnggulan;
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
  unggulan?: SaranaWisataUnggulan; // optional, defaultnya 'N
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
  unggulan?: SaranaWisataUnggulan; // optional
  status?: Status; // optional
}
