import { useInfiniteQuery } from "@tanstack/react-query";
import { apiPosts } from "../axios/axiosIstance";

export const usePostsInfinite = () => useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
        const { data } = await apiPosts.get('/posts', {
            params: { limit: 10, skip: pageParam }
        })
        return data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.length * 10
        return loaded < lastPage.total ? loaded : undefined  // undefined = non ci sono altre pagine
    }
})

// const {
//   fetchNextPage,        // funzione per caricare la pagina successiva — la chiami al click del bottone
//   fetchPreviousPage,    // funzione per caricare la pagina precedente (raramente usato)
//   hasNextPage,          // true se getNextPageParam ritorna un valore (non undefined)
//   hasPreviousPage,      // true se getPreviousPageParam ritorna un valore
//   isFetchingNextPage,   // true mentre sta caricando la pagina successiva
//   isFetchingPreviousPage,
//   ...result             // tutto il resto di useQuery (data, isLoading, ecc.)
// } = useInfiniteQuery({
//   queryKey,
//   queryFn: ({ pageParam }) => fetchPage(pageParam),  // pageParam è il valore che gli passi tu

//   getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
//   // ↑ determina qual è il pageParam della prossima pagina
//   // se ritorna undefined → hasNextPage diventa false → non ci sono altre pagine

//   getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
//   // ↑ stesso concetto ma per andare indietro
// })


// ricordare di appiattire l'array .flatMap
// data.pages = [
//     { posts: [...10 posts], total: 100, skip: 0,  limit: 10 },  // pagina 1
//     { posts: [...10 posts], total: 100, skip: 10, limit: 10 },  // pagina 2
//     { posts: [...10 posts], total: 100, skip: 20, limit: 10 },  // pagina 3
// ]
// pages ritorna un array di obj risposta , dunque bisogna compattarli
// data.pages.flatMap(page => page.posts) -> accumula tutte le risposte