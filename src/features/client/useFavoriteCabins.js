import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useFavoriteCabins({ ids }) {
    const { data: cabins, isLoading } = useQuery({
        queryFn: () => getCabins({ ids }),
        queryKey: ["favorites", ids],
        onSuccess: (data) => {},
    });

    return { cabins, isLoading };
}
