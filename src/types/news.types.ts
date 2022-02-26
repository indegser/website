export interface NewsType {
  id: string;
  title: string;
  tags: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  created_at: string;
  published_at: string;
}
