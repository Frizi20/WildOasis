import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview as apiCreateReview } from "../../services/apiReview";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function useCreateReview() {
    const { id } = useParams();
    const queryClient = useQueryClient()


    const { isLoading: isCreating, mutate: createReview } = useMutation({
        mutationFn: ({ rating, comment, userId }) => {
            return apiCreateReview({ rating, comment, userId, cabinId: id });
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success("Review created");
            queryClient.invalidateQueries({
                queryKey:['accommodation']
            })

        },
        onError: (err) => {
            toast.error("Could not add review");
            console.error(err);
        },
    });

    return { createReview, isCreating };
}
