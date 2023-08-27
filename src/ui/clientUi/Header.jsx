import { styled } from "styled-components";
import Search from "./Search";
import Logo from "../Logo";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 20px; */
    /* border: 1px solid gainsboro; */
    padding: 20px 0;
    background-color: #fff;
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

const LogoContainer = styled.div`
    height: 20px;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Logo height={70} />
            <Search />
            <Avatar src="/default-user.jpg" />
        </StyledHeader>
    );
}
