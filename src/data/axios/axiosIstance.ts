import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

export default api

//in axiosIstance è possibile definire più api da poter utilizzare per le varie query