export interface MediaType {
  id: string;
  title: string;
  type: string;
  size: string;
  resolution: string;
  date: string;
  url: string;
  storage_path?: string; // Tambahan untuk menyimpan laluan sebenar bucket
}

export const mockMedia: MediaType[] = [
  {
    id: "1",
    title: "tempat menarik di lombok-9.jpg",
    type: "Jpeg",
    size: "1.27 MB",
    resolution: "1080x1080",
    date: "2026-04-16",
    url: "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "tempat menarik di lombok-4.jpg",
    type: "Jpeg",
    size: "743.92 KB",
    resolution: "1080x1080",
    date: "2026-04-16",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "tempat menarik di lombok-11.jpg",
    type: "Jpeg",
    size: "1.01 MB",
    resolution: "1080x1080",
    date: "2026-04-16",
    url: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "featured image tempat menarik di lombok.jpg",
    type: "Jpeg",
    size: "470.49 KB",
    resolution: "1200x628",
    date: "2026-04-16",
    url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "tempat menarik di lombok-2.jpg",
    type: "Jpeg",
    size: "1.35 MB",
    resolution: "1080x1080",
    date: "2026-04-16",
    url: "https://images.unsplash.com/photo-1533630654593-b222d5d44449?q=80&w=800&auto=format&fit=crop",
  },
];
