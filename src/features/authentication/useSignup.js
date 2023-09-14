import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export default function useSignup() {
    const { isLoading, mutate: signup } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            toast.success(
                "Account successfully created! Please verify the new account from the user's email address. "
            );
        },
    });

    return { isLoading, signup };
}
