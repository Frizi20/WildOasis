import { styled } from "styled-components";
import PageHeader from "../../features/client/PageHeader";
import BookingDetails from "../../features/client/BookingDetails";

const PageContainer = styled.div`
    width: 1100px;
    max-width: 100%;
    margin: 0 auto;
`;


export default function Book() {
    return (
        <PageContainer>
            <PageHeader> Finish booking </PageHeader>
            <BookingDetails/>
        </PageContainer>
    );
}
