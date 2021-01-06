import axios from 'axios'

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://community-concerns.herokuapp.com',
    headers: {
      authorization: token
    }
  })
}
