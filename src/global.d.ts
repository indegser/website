interface IStory {
  id: string;
  content: string;
  slug: string;
  data: {
    title: string;
    excerpt?: string;
    coverUrl?: string;
    coverAlt?: string;
  };
  createdAt: number;
  modifiedAt: number;
}
