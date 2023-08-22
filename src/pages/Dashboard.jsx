import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import DashboardFilter from "../features/dashboard/DashboardFilter";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

function Dashboard() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <Container>
                    <DashboardFilter />
                </Container>
            </Row>
            <DashboardLayout />
        </>
    );
}

export default Dashboard;
