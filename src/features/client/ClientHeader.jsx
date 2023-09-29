import { useMediaQuery } from "react-responsive";
import ClientNav from "../../ui/clientUi/ClientNav";
import Header from "../../ui/clientUi/Header";
import styled from "styled-components";

const FixedHeader = styled.div`
    /* position: sticky; */
    /* top: 0; */
    z-index: 200;
`;

export default function ClientHeader() {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });

    return (
        <FixedHeader>
            <Header isMobile={isMobile} />
            {<ClientNav />}
        </FixedHeader>
    );
}
