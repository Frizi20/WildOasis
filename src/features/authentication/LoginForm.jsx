import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import useLogin from "./useLogin";

function LoginForm() {
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("12344321");

    const { login, isLoading } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical $grid="1fr 1fr " label="Email address">
                <Input
                    disabled={isLoading}
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical $grid="1fr 1fr " label="Password">
                <Input
                    disabled={isLoading}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button disabled={isLoading} size="large">
                    {isLoading ? <SpinnerMini /> : <>Login</>}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
