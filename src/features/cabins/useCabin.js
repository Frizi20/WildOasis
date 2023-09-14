import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";
import { useParams } from "react-router-dom";

export default function useCabin() {
    const { id } = useParams();

    const { isLoading, data } = useQuery({
        queryFn: () => {
            return getCabin(id);
        },
        queryKey: ["accommodation", id],
        onSuccess: () => {},
        onError: (err) => {
            console.error(err);
        },
    });

    return { isLoading, data };
}
