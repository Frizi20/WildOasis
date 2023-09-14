import { styled } from "styled-components";
import Search from "./Search";
import Logo from "../Logo";

import { HiOutlineMenu } from "react-icons/hi";
import { useUser } from "../../features/authentication/useUser";
import ClientAvatar from "./css/ClientAvatar";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    background-color: #fff;
    border-bottom: 1px solid #ececec;
    margin-bottom: 10px;
`;

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

const LogoContainer = styled.div`
    cursor: pointer;
`;

export default function Header({ isMobile }) {
    const { isLoading, user } = useUser();

    if (isLoading) return null;

    return (
        <StyledHeader>
            {!isMobile && (
                <LogoContainer>
                    <Logo height={60} noTitle={true} />
                </LogoContainer>
            )}
            <Search isMobile={isMobile} />
            {!isMobile && (
                <AvatarContainer>
                    <HiOutlineMenu />
                    {/* <Avatar src="/de fault-user.jpg" /> */}
                    <ClientAvatar />
                </AvatarContainer>
            )}
        </StyledHeader>
    );
}
