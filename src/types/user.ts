export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}
export enum Roles {
  admin_kan = "admin_kab",
  admin_desa = "admin_desa",
  user = "user",
}
export interface User {
  id: number;
  desa_id: number | null;
  nik: string;
  username: string;
  email: string;
  full_name: string;
  role: Roles;
  status: Status;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null; // optional, for include
}

export interface UserCreate {
  desa_id?: number | null; // optional, bisa null
  nik: string;
  full_name: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  status: Status; // optional, default "active"
}

export interface UserUpdate {
  desa_id?: number | null; // optional, bisa null
  nik?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Roles;
  full_name?: string;
  status?: Status; // optional, default "active"
}
