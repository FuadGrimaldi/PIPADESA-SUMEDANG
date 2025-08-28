import { Status } from "./agenda";

export enum PengaduanAspirasiKategori {
  pengaduan = "pengaduan",
  aspirasi = "aspirasi",
}

export interface PengaduanAspirasi {
  id: number;
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: PengaduanAspirasiKategori;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface PengaduanAspirasiCreate {
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: PengaduanAspirasiKategori;
  status?: Status; // default to Pending if not provided
}

export interface PengaduanAspirasiUpdate {
  desa_id?: number;
  name?: string;
  email?: string;
  no_telp?: string;
  pesan?: string;
  kategori?: PengaduanAspirasiKategori;
  status?: Status; // default to Pending if not provided
}

export interface PengaduanAspirasiUpdateStatus {
  status: Status;
}
