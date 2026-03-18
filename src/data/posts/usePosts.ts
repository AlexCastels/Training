import { useQuery } from '@tanstack/react-query'
import { apiPosts } from '../axios/axiosIstance'

export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
        console.log('Fetching posts...')
        const { data } = await apiPosts.get('/posts')
        return data
    },
})

// Sono stati che espone già tanstack 
// data: any = i dati restituiti dalla query 
// isLoading: boolean = `true` durante il primo fetch 
// isError:  boolean = `true` se la chiamata è fallita 
// error: object = l'errore lanciato da Axios 
// isSuccess: boolean = `true` se la chiamata è andata a buon fine 
// isFetching: boolean = `true` anche durante i re-fetch in background 

// destrutturiamo { data } perchè response è un oggetto così:
// {
//     data: { id: 101, title: 'foo', ... },  // ← il body della risposta HTTP
//     status: 201,
//     statusText: 'Created',
//     headers: { ... },
//     config: { ... },
// }