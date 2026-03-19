import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiProducts } from '../axios/axiosIstance'

interface QueryParamsInterface {
    pageIndex : number ;
    pageSize : number ;
    // skip : number ;
}

export const useProducts = ({ pageSize = 10, pageIndex } : QueryParamsInterface) => useQuery({
    queryKey: ['products', pageSize , pageIndex],
    queryFn: async () => {
        const { data } = await apiProducts.get('/products', {
            params: {
                limit: pageSize,
                skip: pageIndex * pageSize ,
            }
        })
        return data
    },
    placeholderData: keepPreviousData, //permette di mantenere i dati precedenti in attesa di quelli nuovi
})