import axios from 'axios'
const BASE_URL = 'http://localhost:3030'

export const getStories = () => axios.get(BASE_URL + '/api/story')
