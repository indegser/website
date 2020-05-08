interface IData {
  id: string
  createdAt: number
  modifiedAt: number
}

export interface IStory extends IData {
  slug: string
  data: {
    title: string
    excerpt?: string
    coverUrl?: string
    coverAlt?: string
  }
  content: string
}
