import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return loginApi({ email, password });
        },
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Provided cridentials are incorrect");
        },
    });

    return { login, isLoading };
}
