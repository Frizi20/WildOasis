import { styled } from "styled-components";
import Header from "./Header";
import ClientNav from "./ClientNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const StyledClientLayout = styled.div`
    padding: 0 80px;
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
                {/* <Footer /> */}
            </PageContainer>
        </StyledClientLayout>
    );
}
