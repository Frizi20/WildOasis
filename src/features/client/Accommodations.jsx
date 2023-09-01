import { styled } from "styled-components";
import AccommoidationItem from "../../ui/clientUi/AccommoidationItem";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";

const StyledAccomodationsContainer = styled.div`
    flex: 0 0 200px;
    overflow: hidden;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 25px;

    /* background-color: red; */

    min-height: 700px;

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
`;

const FakeCabbinsContainer = styled.div`
    /* min-height: 700px; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Accommodations() {
    const { cabins, isLoading } = useCabins();

    if (isLoading)
        return (
            <>
                <StyledAccomodationsContainer>
                    <Spinner />
                </StyledAccomodationsContainer>
            </>
        );


    const double = [...cabins];

    return (
        <>
            <StyledAccomodationsContainer>
                {double.map((accomodation, index) => {
                    return (
                        <AccommoidationItem
                            key={index}
                            accommodation={accomodation}
                        />
                    );
                })}
            </StyledAccomodationsContainer>
        </>
    );
}