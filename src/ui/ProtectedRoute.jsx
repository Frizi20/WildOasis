import { styled } from "styled-components";
import {useUser} from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--color-grey-50);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    console.log('intra');
 
    // 1. Load authenticatedu user
    const { isLoading, isAuthenticated } = useUser();

    // 3. If there is no authenticated user redirect to the login page

    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    // 2. While Loading, show spinner

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4 If there is a user, render the app
    if (isAuthenticated) return children;
}
