import Axios from 'axios'
import { apiClient } from './apiLib'
import { IStory, IBook } from 'types/dataTypes'
import env from 'config/env'

const markdown = async (id: string) => {
  try {
    const url = `https://choseh.s3.ap-northeast-2.amazonaws.com/${id}.md`
    const { data } = await Axios.get(url)
    return data
  } catch (err) {
    return ''
  }
}

const BASE_URL =
  env.gitBranch === 'master'
    ? 'https://sejong.now.sh/api'
    : 'http://localhost:3001/api' // 'https://sejong-edge.now.sh/api'

const sejongApi = {
  markdown,
  authenticate: ({ email, password }) => {
    return apiClient<any>(BASE_URL + '/user/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  createStory: (data) => {
    return apiClient(BASE_URL + '/story', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  getStory: (slug: string) => {
    const fragment = `/story/${encodeURIComponent(slug)}`
    return apiClient<IStory>(BASE_URL + fragment)
  },
  getStories: () => {
    return apiClient<IStory[]>(BASE_URL + '/story')
  },
  getBooks: () => {
    return apiClient<IBook[]>(BASE_URL + '/book')
  },
  getBook: (url: string) => {
    return apiClient<IBook>(BASE_URL + url)
  },
  newBook: (data) => {
    return apiClient<IBook>(BASE_URL + '/book/new', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  updateBook: (id: string, book: IBook) => {
    return apiClient<IBook>(BASE_URL + `/book/${id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
  deleteBook: (book: IBook) => {
    return apiClient(BASE_URL + '/book/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: book.id }),
      headers: {
        'content-type': 'application/json',
      },
    })
  },
}

export default sejongApi
