import { styled } from "styled-components";
import Header from "./Header";
import ClientNav from "./ClientNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import PageHeader from "../../features/client/PageHeader";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";
import MobileNavList from "../../features/client/MobileNavList";

const StyledClientLayout = styled.div`
    /* padding: 0 80px; */
    display: flex;
    justify-content: center;
    padding-bottom: 50px;

    @media screen and (max-width: 1500px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 750px) {
        padding: 0 15px;
    }
`;

const PageContainer = styled.div`
    /* border: 1px solid gainsboro; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    width: 100%;
    position: relative;
`;

const FixedHeader = styled.div`
    /* position: sticky; */
    /* top: 0; */
    z-index: 200;
`;

const Container = styled.div``;

export default function ClientLayout({ withNav = false }) {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });
    return (
        <StyledClientLayout>
            <PageContainer>
                <FixedHeader>
                    <Header isMobile={isMobile} />
                    {withNav && <ClientNav />}
                </FixedHeader>

                <Container>
                    <Outlet />
                </Container>
            </PageContainer>
        </StyledClientLayout>
    );
}
