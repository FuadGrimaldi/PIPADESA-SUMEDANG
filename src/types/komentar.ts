import { Status } from "./agenda";

export interface Komentar {
  id: number;
  article_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export interface CreateKomentarData {
  article_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  status?: Status; // default to Pending if not provided
}

export interface UpdateKomentarData {
  article_id?: number;
  name?: string;
  email?: string;
  no_telp?: string;
  pesan?: string;
  status?: Status; // default to Pending if not provided
}

export interface UpdateKomentarStatus {
  status: Status;
}
