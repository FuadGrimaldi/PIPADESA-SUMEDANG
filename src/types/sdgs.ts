export interface Sdgs {
  id: number;
  title: string;
  image: string;
}

export interface CreatSdgs {
  title: string;
  image: string;
}
export interface UpdateSdgs {
  title?: string;
  image?: string;
}

export interface SdgsScore {
  id: number;
  desa_id: number;
  sdgs_id: number;
  score: number;
  tahun: number;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null; // optional, for include
  sdgs?: {
    id: number;
    title: string;
    image: string;
  } | null; // optional, for include
}

export interface CreateSdgsScore {
  desa_id: number;
  sdgs_id: number;
  score: number;
  tahun: number;
}
export interface UpdateSdgsScore {
  desa_id?: number;
  sdgs_id?: number;
  score?: number;
  tahun?: number;
}
