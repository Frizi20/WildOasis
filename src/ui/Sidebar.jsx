import { css, styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    position: relative;
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    overflow: hidden;

    /* transition: 2s ease-in-out all; */

    ${(props) =>
        !props.$isMenuOpen &&
        css`
            /* opacity: 0; */
            padding: 3.2rem 1.4rem;
        `}
`;

export default function Sidebar() {
    const { isMenuOpen } = useDarkMode();

    return (
        <StyledSidebar $isMenuOpen={isMenuOpen}>
            <SidebarButton />
            <Logo />
            <MainNav />

            <Uploader />
        </StyledSidebar>
    );
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    /* position: absolute; */
    top: 50px;
    left: 46px;
    cursor: pointer;
`;

function SidebarButton() {
    const { setIsMenuOpen, isMenuOpen } = useDarkMode();

    return (
        <ButtonContainer>
            <ButtonIcon
                onClick={() => {
                    setIsMenuOpen((p) => !p);
                }}
            >
                {isMenuOpen ? <HiArrowLeft /> : <HiArrowRight />}
            </ButtonIcon>
        </ButtonContainer>
    );
}
