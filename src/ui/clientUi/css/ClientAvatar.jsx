import styled from "styled-components";
import { useUser } from "../../../features/authentication/useUser";
import Spinner from "../../Spinner";

const Avatar = styled.img`
    display: block;
    width: 34px;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

export default function ClientAvatar() {
    const { isLoading, user } = useUser();

    if (isLoading) return <Spinner />;

    const avatar = user?.user_metadata?.avatar || "/default-user.jpg";

    return <Avatar src={avatar} />;
}
