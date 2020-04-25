interface IData {
  id: string
  createdAt: number
  modifiedAt: number
}

export interface IBook extends IData {
  title: string
  citation: string
  cover?: string
  authors?: string[]
  publishedYear?: number
}

export interface IHistory extends IData {
  title: string
  link: string
  cover: string
  excerpt?: string
  comment?: string
}

export interface IChoseh {
  edition: number
  content: string
  frontMatter: any
}

export interface INews extends IData {
  body: string
}

export interface IStory extends IData {
  slug: string
  github: {
    commit: {
      message: string
      sha: string
      branch: string
    }
    file: {
      sha: string
      downloadUrl: string
      gitUrl: string
    }
  }
  frontMatter: {
    title: string
    excerpt?: string
    coverUrl?: string
    coverAlt?: string
  }
  content?: string
}

export interface IStoryPreview extends Omit<IStory, 'content' | 'github'> {}
