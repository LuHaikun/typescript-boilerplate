import axios from 'axios'

const login = (data: any): any => {
  return axios.post('/V1.0/user/login', data)
}

export default {
  login
}
