interface IData {
  id: string
  createdAt: string
  modifiedAt: string
}

export interface IBook extends IData {
  title: string
  citation: string
  cover?: string
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
