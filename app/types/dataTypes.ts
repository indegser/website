interface IData {
  id: string
  createdAt: number
  modifiedAt: number
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
