import axios from 'axios'

const http = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos'
})

export default http
