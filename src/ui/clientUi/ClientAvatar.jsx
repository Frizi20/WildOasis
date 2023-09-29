import { HiOutlineMenu } from "react-icons/hi";
import styled from "styled-components";

const AvatarContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 4px 12px;
    border: 1px solid #7e7e7e;
    border-radius: 50px;
    user-select: none;

    & svg {
        width: 20px;
        height: 20px;
    }
`;


export default function ClientAvatar() {
    return (
        <AvatarContainer>
            <HiOutlineMenu />
            {/* <Avatar src="/de fault-user.jpg" /> */}
            <ClientAvatar />
        </AvatarContainer>
    );
}
