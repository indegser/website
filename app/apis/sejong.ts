import axios from 'axios'

let BASE_URL

if (process.env.MODE === 'LOCAL') {
  BASE_URL = 'http://localhost:3030'
} else {
  BASE_URL = 'https://sejong.indegser.com'
}

export const getStories = () => axios.get(BASE_URL + '/api/story')

export const getHistories = () => axios.get(BASE_URL + '/api/history')
