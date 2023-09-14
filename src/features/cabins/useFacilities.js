import { useQuery } from "@tanstack/react-query"
import {getFacilities} from "../../services/apiFacilities"



export default function useFacilities() {

    const {data: facilities, isLoading} = useQuery({
        queryFn: getFacilities,
        queryKey:['facilities'],
        onError:err=>console.log(err),
        retry: false
    })

    return {facilities, isLoading}
}

