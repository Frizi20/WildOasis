import { useSearchParams } from "react-router-dom"


export default function useQueryParams(...args) {

    const [getSearchParams] = useSearchParams()
    const queryData = {}

    args.forEach(arg=>{
        queryData[arg] = getSearchParams.get(arg)
    })

    return queryData
}

