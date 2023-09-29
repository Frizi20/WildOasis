import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export default function useCabins() {
    const [searchParams] = useSearchParams();

    const searchValue = searchParams.get("search") || null;
    const facilities = searchParams.get("facilities")?.split(",") || null;
    const property = searchParams.get("property") || null;
    const range = searchParams.get("range")?.split(",") || null;
    const guests = searchParams.get("guests") || null;

    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins", searchValue, facilities, property, range, guests],
        queryFn: () => {
            return getCabins({
                search: searchValue,
                facilities,
                property,
                range,
                guests,
            });
        },
    });

    return { isLoading, cabins, error };
}
