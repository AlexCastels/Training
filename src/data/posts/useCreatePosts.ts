import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPosts } from "../axios/axiosIstance";

//esempio con JSON placeholder, si aspetta questi parametri nella post, ritorna solamente un log e non un dato reale con la POST
interface PostInterface {
    title: string, 
    body: string, 
    userId: number 
}

const createPost = async (post: PostInterface) => {
    const { data } = await apiPosts.post('/posts', post)
    return data
}

// destrutturiamo { data } perchè response è un oggetto così:
// {
//     data: { id: 101, title: 'foo', ... },  // ← il body della risposta HTTP
//     status: 201,
//     statusText: 'Created',
//     headers: { ... },
//     config: { ... },
// }

export default function useCreatePosts(){
    const queryClient = useQueryClient() ;

    return useMutation({
        mutationFn: createPost , //si aspetta una funzione (post: PostInterface) => api.post('/posts', post)
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError : (error) => {
            console.log('Errore nella chiamata post: ' + error)
        }
    })
}

//  useMutation si preoccupa di gestire lo stato della chiamata e risolvere la Promise, espone un metodo mutation che 
//  si collega alla funzione che andiamo a definire 
//  si potrebbe scrivere anche così direttamente in linea
//  mutationFn : (post : PostInterface) => { 
//      return api.post('/posts' , post) ; // mutationFn si aspetta una Promise
//  }