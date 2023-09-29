import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import MobileHeader from "../../ui/clientUi/MobileHeader";
import MobileNavList from "../../features/client/MobileNavList";
import { Heading } from "../../features/client/BookingDetails";
import PageHeader from "../../features/client/PageHeader";
import PageRow from "../../ui/clientUi/PageRow";
import Row from "../../ui/clientUi/Row";

const Wrapper = styled.div``;
const Header = styled.div``;
const Container = styled.div`
    max-width: 100%;
    gap: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 100px;

    & .row {
        border: 1px solid gainsboro;
        padding: 30px;
        border-radius: 15px;
    }

    @media screen and (max-width: 775px) {
        grid-template-columns: 1fr;
        gap: 5px;
    }
`;

export default function ClientAccount() {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });

    return (
        <Wrapper>
            <PageHeader>Personal info</PageHeader>
            <Container>
                <PageRow>
                    <Row type="horizontal">
                        <div>
                            <div className="label">Legal name</div>
                            <div className="value">Matac Cristi</div>
                        </div>
                        <div className="edit">Edit</div>
                    </Row>
                </PageRow>
                <PageRow>
                    <Row type="horizontal">
                        <div>
                            <div className="label">Email address</div>
                            <div className="value">frizi20@yahoo.com</div>
                        </div>
                        <div className="edit">Edit</div>
                    </Row>
                </PageRow>
                <PageRow>
                    <Row type="horizontal">
                        <div>
                            <div className="label">Phone number</div>
                            <div className="value">+40 720 251 005</div>
                        </div>
                        <div className="edit">Edit</div>
                    </Row>
                </PageRow>
                <PageRow>
                    <Row type="horizontal">
                        <div>
                            <div className="label">Government ID</div>
                            <div className="value">Matac Cristi</div>
                        </div>
                        <div className="edit">Edit</div>
                    </Row>
                </PageRow>
                <PageRow>
                    <Row type="horizontal">
                        <div>
                            <div className="label">Address</div>
                            <div className="value">Jud Ialomita, Slobozia</div>
                        </div>
                        <div className="edit">Edit</div>
                    </Row>
                </PageRow>
            </Container>

            {isMobile && (
                <MobileHeader>
                    <MobileNavList />
                </MobileHeader>
            )}
        </Wrapper>
    );
}
