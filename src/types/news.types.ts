export interface NewsType {
  id: string;
  title: string;
  tag: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  created_at: string;
  published_at: string;
}

export interface TagType {
  id: string;
  name: string;
  created_at: string;
}
