import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from "react"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // caching per 5 min
            //refetchOnWindowFocus: true, // dà la possibilità di refetchare entrando in focus
        },
    },
})

export default function TanstackProvider({children} : { children : ReactNode }){
    return (
        <QueryClientProvider client={queryClient}>
            { children }
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}

// tanstack utilizza un context per gestire il suo funzionamento e per espandere i suoi hook nell'app
// ReactQueryDevtools: nel devtool possiamo tracciare le chiamate
// 🟢 Verde fresh = dati freschi, non ri-fetcherà
// 🟡 Giallo stale = dati vecchi, ri-fetcherà alla prossima occasione
// 🔵 Blu fetching = sta fetchando in questo momento
// 🟣 Viola paused = fetch in pausa (es. offline)
// ⚫ Grigio inactive = nessun componente sta usando questa query

