export interface Video {
  id: number;
  desa_id: number;
  title: string;
  deskripsi: string;
  embed_url: string;
  categori: string;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface VideoCreate {
  desa_id: number;
  title: string;
  deskripsi: string;
  embed_url: string;
  categori: string;
  created_at?: Date; // optional, defaultnya waktu sekarang
  updated_at?: Date; // optional, defaultnya waktu sekarang
  uploaded_at?: Date; // optional, defaultnya waktu sekarang
}

export interface VideoUpdate {
  title?: string;
  deskripsi?: string;
  embed_url?: string;
  categori?: string;
  updated_at?: Date; // optional, defaultnya waktu sekarang
  uploaded_at?: Date; // optional
}
