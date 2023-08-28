import { styled } from "styled-components";
import Search from "./Search";
import Logo from "../Logo";

import { HiOutlineMenu } from "react-icons/hi";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    background-color: #fff;
`;

const AvatarContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 4px 13px;
    border: 1px solid #7e7e7e;
    border-radius: 50px;
    user-select: none;

    & svg {
        width: 20px;
        height: 20px;
    }
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 2.5rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

const LogoContainer = styled.div`
    cursor: pointer;
`;

export default function Header() {
    return (
        <StyledHeader>
            <LogoContainer>
                <Logo height={70} noTitle={true} />
            </LogoContainer>
            <Search />
            <AvatarContainer>
                <HiOutlineMenu />
                <Avatar src="/default-user.jpg" />
            </AvatarContainer>
        </StyledHeader>
    );
}
