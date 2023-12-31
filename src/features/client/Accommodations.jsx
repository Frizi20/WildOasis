import { styled } from "styled-components";
import AccommoidationItem from "./AccommoidationItem";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { css } from "styled-components";
import { useEffect } from "react";
import MobileHeader from "../../ui/clientUi/MobileHeader";
import MobileNavList from "./MobileNavList";
import { useMediaQuery } from "react-responsive";
import Header from "../../ui/clientUi/Header";
import ClientNav from "../../ui/clientUi/ClientNav";
import ClientHeader from "./ClientHeader";

const StyledAccomodationsContainer = styled.div`
    /* flex: 0 0 200px; */
    overflow: hidden;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 25px;

    /* background-color: red; */

    /* min-height: 700px; */

    @media screen and (max-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 750px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 950px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 550px) {
        grid-template-columns: 1fr;
    }

    ${(props) => {
        return (
            props?.$spinner &&
            css`
                display: flex !important;
                align-items: center;
                justify-content: center;
            `
        );
    }}
`;

export default function Accommodations() {
    const { cabins, isLoading } = useCabins();

    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });

    if (isLoading)
        return (
            <>
                <StyledAccomodationsContainer $spinner={true}>
                    <Spinner />
                </StyledAccomodationsContainer>
            </>
        );

    return (
        <>
            {/* <ClientHeader /> */}
            <StyledAccomodationsContainer>
                {cabins.length > 0 ? (
                    cabins.map((accomodation, index) => {
                        return (
                            <AccommoidationItem
                                key={index}
                                accommodation={accomodation}
                            />
                        );
                    })
                ) : (
                    <p style={{ position: "absolute" }}>
                        {" "}
                        No accommodations found, try changing the filter{" "}
                    </p>
                )}

                {isMobile && (
                    <MobileHeader>
                        <MobileNavList />
                    </MobileHeader>
                )}
            </StyledAccomodationsContainer>
        </>
    );
}
