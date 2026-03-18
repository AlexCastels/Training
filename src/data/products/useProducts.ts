import { useQuery } from "@tanstack/react-query"
import { apiProducts } from '../axios/axiosIstance'

interface QueryParamsInterface {
    pageIndex : number ;
    limit : number ;
    skip : number ;
}

export const useProducts = ({ limit = 10, pageIndex } : QueryParamsInterface) => useQuery({
    queryKey: ['products', limit , pageIndex],
    queryFn: async () => {
        const { data } = await apiProducts.get('/products', {
            params: {
                limit: limit,
                skip: pageIndex * limit ,
            }
        })
        return data
    },
})