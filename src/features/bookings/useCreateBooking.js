import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const { mutate: createBooking, isLoading } = useMutation({
        mutationFn: createBookingApi,
        onSuccess: (data) => {
            toast.success("Finalized booking!");
            queryClient.invalidateQueries({ active:true });
            navigate(`/client/`)
        },
    });

    return { createBooking, isLoading };
}
