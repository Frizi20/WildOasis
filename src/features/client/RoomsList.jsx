/* eslint-disable no-unused-vars */
import { HiAdjustments, HiUserRemove } from "react-icons/hi";
import { HiFingerPrint, HiFlag, HiTv, HiWifi } from "react-icons/hi2";
import { BiBed } from "react-icons/bi";
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

const StyledRoomsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

 
`;

const StyledRoomItem = styled.div`

    flex: 1;

    padding: 20px;
    display: grid;
    flex-direction: column;
    border: 1px solid gainsboro;
    border-radius: 10px;

    & .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & svg {
        height: 30px;
        width: 30px;
    }

    & .room-type {
        font-size: 1.9rem;
        text-align: center;
    }

    & .room-details {
        color: #8b8b8b;
        font-size: 1.2rem;
        text-align: center;
    }
`;

export default function RoomsList() {
    return (
        <StyledRoomsList>
            <RoomItem />
            <RoomItem />
            <RoomItem />
        </StyledRoomsList>
    );
}

function RoomItem({ room }) {
    return (
        <StyledRoomItem>
            <div className="icon">
                <BiBed />
            </div>
            <div className="room-type">Bedroom</div>
            <div className="room-details">1 double bed, 1 single bed</div>
        </StyledRoomItem>
    );
}
