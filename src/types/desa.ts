import { Decimal } from "@prisma/client/runtime/library";
export interface Desa {
  subdomain: string;
  id: number;
  nama_desa: string;
  alamat: string;
  telepon: string;
  email: string;
  foto_depan?: string | null;
  twitter: string;
  instagram: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat: Decimal | null;
  lng: Decimal | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDesa {
  subdomain: string;
  nama_desa: string;
  alamat: string;
  telepon: string;
  email: string;
  foto_depan?: string | null;
  twitter: string;
  instagram: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat?: number | null;
  lng?: number | null;
}

export interface UpdateDesa {
  subdomain?: string;
  nama_desa?: string;
  alamat?: string;
  telepon?: string;

  email?: string;
  foto_depan?: string | null;
  twitter?: string;
  instagram?: string;
  visi?: string;
  misi?: string;
  tujuan?: string;
  sejarah?: string;
  gmaps_embed_url?: string;
  lat?: number | null;
  lng?: number | null;
}
