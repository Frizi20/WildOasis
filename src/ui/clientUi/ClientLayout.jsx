import { styled } from "styled-components";
import Header from "./Header";
import ClientNav from "./ClientNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import PageHeader from "../../features/client/PageHeader";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";

const StyledClientLayout = styled.div`
    /* padding: 0 80px; */
    display: flex;
    justify-content: center;
    padding-bottom: 50px;

    @media screen and (max-width: 1500px) {
        padding: 0 40px;
    }

    @media screen and (max-width: 750px) {
        padding: 0 25px;
    }
`;

const PageContainer = styled.div`
    /* border: 1px solid gainsboro; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1400px;
    width: 100%;
`;

const FixedHeader = styled.div`
    /* position: sticky; */
    /* top: 0; */
    z-index: 1000;
`;

const Container = styled.div``;

export default function ClientLayout({ withNav = false }) {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });
    console.log(isMobile);
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

                {isMobile && <MobileHeader />}
            </PageContainer>
        </StyledClientLayout>
    );
}
