import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,  // millisecondi — se la chiamata supera 10s lancia un errore
    
    // headers: {
    //     'Content-Type': 'application/json',  // di default già impostato da Axios
    //     'x-api-key': import.meta.env.VITE_API_KEY,
    //     'Accept-Language': 'it',
    // },

    // params: {
    //     version: 'v2',  // query string aggiunta a tutte le chiamate → /posts?version=v2
    // },
}) ;

//middleware request - prima della chiamata, utile per autenticazioni, validazioni
api.interceptors.request.use((config) => {
    console.log(`🚀 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`)
    return config
})

//middleware response - dopo la chiamata, utile per manipolare i dati della risposta
api.interceptors.response.use(
    (response) => {
        console.log(`✅ [${response.status}] ${response.config.url}`)
        return response
    },
    (error) => {
        console.log(`❌ [${error.response?.status}] ${error.config?.url}`, error.message)
        return Promise.reject(error)
    }
) ;

export default api

//  in axiosIstance è possibile definire più api da poter utilizzare per le varie query

//  interceptors è la middleware di axios, si può puntare alla request o alla response
//  api.interceptors.request.use()  → prima che la chiamata parta
//  api.interceptors.response.use() → dopo che la risposta torna