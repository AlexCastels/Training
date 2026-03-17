import { Button, Skeleton } from '@mui/material';
import MaterialUICard from '../../../components/elements/MaterialUICard';
import useCreatePosts from '../../../data/posts/useCreatePosts'
import { usePosts } from '../../../data/posts/usePosts'
import styles from './Posts.module.css'
import { useState } from 'react';

interface PostInterface {
    title: string, 
    body: string, 
    userId: number 
}

export default function Posts(){

    const { data , isError , isLoading } = usePosts() ;
    const { mutate , isPending  } = useCreatePosts() ; 

    const testPost = { title: 'Test', body: 'Test post api', userId: 10 }
    const [ elementNumber , setElementNumebr ] = useState(10) ;

    function savePost(post : PostInterface ){
        mutate( post,
            {
                onSuccess: (data) => console.log('nuovo post:', data),
                onError: (error) => console.log('errore:', error),
            }
        ) ;
    }

    return ( 
        <div className={styles.sectionContainer}>
            <h2>Posts List</h2>
            <div className={styles.container}>
                { isLoading ?
                    <div className={styles.gridContainer}>
                        {Array.from({ length: 10 }).map(( element , i) => (
                            <Skeleton key={i} variant="rounded" width="100%" height={300} />
                        ))}
                    </div>
                    :
                    <div className={styles.gridContainer}>
                        { data && data.slice(0, elementNumber ).map((post : any , index : number) => (
                            <MaterialUICard key={index} id={post.id} body={post.body} title={post.title} />
                        )) }
                    </div> 
                }
            </div>
            { elementNumber !== data?.length && 
                <Button variant='contained' onClick={() => setElementNumebr(p => p + 10)}>
                    { 'Loadmore'}
                </Button> 
            }
            <Button variant='contained' onClick={() => savePost(testPost)}>
                { isPending ? 'Salvataggio..'  : 'Crea post'}
            </Button>
        </div>
    )
}

// mutate(payload, { onSuccess, onError }) mutate può restituire come callback anche le due funzioni
// const { 
//     mutate,      // funzione sincrona per triggerare la mutation
//     mutateAsync, // stessa cosa ma ritorna una Promise (usabile con await)
//     isPending,   // sta eseguendo
//     isSuccess,   // è andata a buon fine
//     isError,     // è fallita
//     isIdle,      // non ancora chiamata
//     data,        // risposta del server dopo il successo
//     error,       // errore dopo il fallimento
//     reset,       // resetta lo stato della mutation
// } = useCreatePosts()

