import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export default function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: (id) => {
            return apiDeleteBooking(id);
        },
        onSuccess: () => {
            toast.success(`Booking was successfully deleted!`);
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (err) => {
            console.error(err);
            toast.error(`Booking coul not be deleted`);
        },
    });

    return { deleteBooking, isDeleting };
}
