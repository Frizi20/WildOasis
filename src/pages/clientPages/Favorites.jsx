import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import MobileHeader from "../../ui/clientUi/MobileHeader";
import MobileNavList from "../../features/client/MobileNavList";
import PageHeader from "../../features/client/PageHeader";

const Wrapper = styled.div``;


export default function Favorites() {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });

    return (
        <Wrapper>
            <PageHeader>Inbox</PageHeader>


            {isMobile && (
                <MobileHeader>
                    <MobileNavList />
                </MobileHeader>
            )}
        </Wrapper>
    );
}
