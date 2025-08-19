export enum AgendaKategori {
  Kebudayaan = "Kebudayaan",
  Olahraga = "Olahraga",
  Umum = "Umum",
  Peringatan_Hari_Besar = "Peringatan_Hari_Besar",
  Sepedahan = "Sepedahan",
  Olahraga_Asik = "Olahraga_Asik",
  PKK = "PKK",
}

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface Agenda {
  id: number;
  desa_id: number;
  judul: string;
  slug: string;
  kategori: AgendaKategori;
  deskripsi: string;
  lokasi: string;
  waktu: string; // ISO date string, use Date if you prefer
  poster: string | null;
  created_by: number;
  status: Status;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface CreateAgendaData {
  desa_id: number;
  judul: string;
  slug: string;
  kategori: AgendaKategori;
  deskripsi: string;
  lokasi: string;
  waktu: string; // ISO date string
  poster?: string | null;
  created_by: number;
  status?: Status; // default to Pending if not provided
}
export interface UpdateAgendaData {
  desa_id?: number;
  judul?: string;
  slug?: string;
  kategori?: AgendaKategori;
  deskripsi?: string;
  lokasi?: string;
  waktu?: string; // ISO date string
  poster?: string | null;
  created_by?: number;
  status?: Status; // default to Pending if not provided
}
