import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Header from "./Header";
import { css, styled } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;

    transition: .2s ease-in all;

    ${props=>!props.$isMenuOpen && css`
        grid-template-columns: 10rem 1fr !important;
    `}

    height: 100vh;
    overflow-x: hidden;


`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: auto;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    min-width: 950px;
`;

export default function AppLayout() {

    const {isMenuOpen} = useDarkMode()



    return (
        <StyledAppLayout $isMenuOpen={isMenuOpen}>
            <Header />
            <SideBar />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}
