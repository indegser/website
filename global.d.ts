declare module '*.svg' {
  const content: any
  export default content
}

interface StoryProps {
  id: string
  title: string
  excerpt: string
}

interface HistoryProps {
  id: string
  cover: string
  title: string
}

type PageStateType =
  | {
      stories: [StoryProps]
    }
  | {
      histories: [HistoryProps]
    }

interface AppState {
  page: PageStateType
}
