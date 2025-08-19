// src/types/gallery.ts
export interface GalleryItem {
  id: string; // kombinasi dari type dan id asli
  originalId: number;
  type: "article" | "agenda";
  title: string;
  image_url: string;
  published_date: Date;
  slug?: string; // untuk artikel
}

export interface GalleryResponse {
  items: GalleryItem[];
  total: number;
}
