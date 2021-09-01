import axios from 'axios'

const api = axios.create({
  baseURL: 'http://challenge-api.luizalabs.com'
})

export default api
