import { HiAdjustments, HiUserRemove } from "react-icons/hi";
import { HiFingerPrint, HiFlag, HiTv, HiWifi } from "react-icons/hi2";
import { styled } from "styled-components";

const icons = [
    {
        item: <HiWifi />,
        description: "HiWifi ",
    },
    {
        item: <HiTv />,
        description: "HiTv ",
    },
    {
        item: <HiFingerPrint />,
        description: "HiFingerPrint ",
    },
    {
        item: <HiUserRemove />,
        description: "HiUserRemove ",
    },
    {
        item: <HiAdjustments />,
        description: "HiAdjustments ",
    },
    {
        item: <HiFlag />,
        description: "HiFlag ",
    },
    {
        item: <HiUserRemove />,
        description: "HiUserRemove ",
    },
    {
        item: <HiWifi />,
        description: "HiWifi ",
    },
    {
        item: <HiTv />,
        description: "HiTv ",
    },
    {
        item: <HiFingerPrint />,
        description: "HiFingerPrint ",
    },
    {
        item: <HiUserRemove />,
        description: "HiUserRemove ",
    },
    {
        item: <HiAdjustments />,
        description: "HiAdjustments ",
    },
    {
        item: <HiFlag />,
        description: "HiFlag ",
    },
    {
        item: <HiUserRemove />,
        description: "HiUserRemove ",
    },
];

const StyledFaclitiesList = styled.div`
    border: 1px solid gainsboro;
    padding: 10px 0;
    display: grid;
    gap: 5px;

    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StyledItem = styled.div`
    display: flex;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid gainsboro;
    align-items: center;
    gap: 5px;
`;

export default function FaclitiesList({ facilities }) {
    return (
        <StyledFaclitiesList>
            {facilities.map((facility) => {
              
                return <FacilityItem key={facility} facility={facility} />;
            })}
        </StyledFaclitiesList>
    );
}

function FacilityItem({facility}) {
    return (
        <StyledItem>
            {icons[facility]?.item}
            <span> {icons[facility]?.description} </span>
        </StyledItem>
    );
}
