export type Infografis = {
  id: number;
  desa_id: number;
  title: string;
  gambar_path: string;
};
export type InfografisCreate = {
  desa_id: number;
  title: string;
  gambar_path: string;
};
export type InfografisUpdate = {
  title?: string;
  gambar_path?: string;
};
