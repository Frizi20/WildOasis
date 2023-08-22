import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CreateCabinForm from "./CreateCabinForm";
import { createEditCabin  } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("S-a salvat");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });


    return { isCreating, createCabin };
}
