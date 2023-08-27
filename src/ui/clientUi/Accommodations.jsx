import { styled } from "styled-components";
import AccommoidationItem from "./AccommoidationItem";
import useCabins from "../../features/cabins/useCabins";
import Spinner from "../Spinner";

const StyledAccomodationsContainer = styled.div`
    flex: 0 0 200px;
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 25px;
`;
const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function Accommodations() {
    const { cabins, isLoading } = useCabins();

    console.log(cabins);
    if (isLoading) return <Spinner />;

    return (
        <StyledAccomodationsContainer>
            {cabins.map((accomodation, index) => {
                return (
                    <AccommoidationItem
                        key={accomodation.id}
                        accommodation={accomodation}
                    />
                );
            })}
        </StyledAccomodationsContainer>
    );
}
