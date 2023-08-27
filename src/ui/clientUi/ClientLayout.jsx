import { styled } from "styled-components";
import Header from "./Header";
import ClientNav from "./ClientNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const StyledClientLayout = styled.div`
    padding: 0 100px;
`;

const PageContainer = styled.div`
    /* border: 1px solid gainsboro; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FixedHeader = styled.div`
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Container = styled.div``;

export default function ClientLayout() {
    return (
        <StyledClientLayout>
            <PageContainer>
                <FixedHeader>
                    <Header />
                    <ClientNav />
                </FixedHeader>

                <Container>
                    <Outlet />
                </Container>
                <Footer />
            </PageContainer>
        </StyledClientLayout>
    );
}