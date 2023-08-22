import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export default function useCheckOut() {
    const queryClient = useQueryClient();

    const { mutate: checkOut, isLoading: isCheckinOut } = useMutation({

        mutationFn: (bookingId) => {
           return updateBooking(bookingId, {
                status: "checked-out",
            });
        },
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in `);
            queryClient.invalidateQueries({ active: true });
        },
        onError: () => toast.error(`There was an error while checking out`),
    });

    return { checkOut, isCheckinOut };
}
