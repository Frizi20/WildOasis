import { styled } from "styled-components";
import Row from "../../ui/Row";
import Icon from "../../ui/Icon";

const StyledFaclitiesList = styled.div`
    /* border: 1px solid gainsboro; */
    padding: 10px 0;
    display: grid;
    gap: 5px;

    grid-template-columns: 1fr 1fr;
`;

const StyledItem = styled.div`
    display: flex;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid gainsboro;
    align-items: center;
    gap: 15px;

    & svg {
        width: 20px;
        height: 20px;
    }
`;

export default function Facilities({ facilities }) {
    const mappedFacilities = facilities.map((facility) => facility.facilities);

    return (
        <Row $border="none" $marginTop={20}>
            <h3>Facilities</h3>
            <FaclitiesList facilities={mappedFacilities} />
        </Row>
    );
}

function FaclitiesList({ facilities }) {
    return (
        <StyledFaclitiesList>
            {facilities.map((facility) => {
                return <FacilityItem key={facility.id} facility={facility} />;
            })}
        </StyledFaclitiesList>
    );
}

function FacilityItem({ facility }) {
    return (
        <StyledItem>
            <Icon value={facility.value} />
            <span> {facility.label} </span>
        </StyledItem>
    );
}
