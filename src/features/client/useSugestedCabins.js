import { useQuery } from "@tanstack/react-query";
import { getCabinsSuggestions } from "../../services/apiCabins";

export default function useSugestedCabins({ search }) {
    const querySearch = search.trim().length < 3 ? null : search;

    const { data, isLoading } = useQuery({
        queryFn: () => {
            if (!querySearch) return [];
            return getCabinsSuggestions({ search });
        },
        queryKey: ["suggestions", querySearch],
    });

    return { data, isLoading };
}
