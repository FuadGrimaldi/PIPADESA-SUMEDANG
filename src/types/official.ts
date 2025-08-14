// types/officials.ts
export interface Official {
  id: number;
  desa_id: number;
  name: string;
  position: string;
  photo: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
  profile_desa?: {
    id: number;
    nama_desa: string;
  };
}

export interface CreateOfficialData {
  desa_id: number;
  name: string;
  position: string;
  photo?: string | null;
  display_order: number;
}

export interface UpdateOfficialData {
  id: number;
  desa_id?: number;
  name?: string;
  position?: string;
  photo?: string | null;
  display_order?: number;
}

export interface OfficialFormData {
  name: string;
  position: string;
  desa_id: number;
  display_order: number;
  photo?: File | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
