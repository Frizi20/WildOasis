import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import {MdOutlineArrowBackIosNew} from 'react-icons/md'

const Icon = styled.button`
    outline: none;
    /* background-color: red; */
    border: none;
    box-shadow: none;
    background: transparent;

    border-radius: 50%;
    /* border: 1px solid gainsboro; */
    padding: 10px;
    cursor: pointer;
    /* transform: translateX); */
`;

export default function BackButton({to}) {
    const navigate = useNavigate();

    return (
        <Icon
            onClick={() => {
                navigate(to || -1);
            }}
        >
            <MdOutlineArrowBackIosNew />
        </Icon>
    );
}
