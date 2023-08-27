import { styled } from "styled-components";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";

const StyledSearch = styled.div`
    display: flex;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 50px;
    border: 1px solid gainsboro;
    position: relative;
    box-shadow: 0px 1px 0px 0px #dcdcdcb0;
`;

const Right = styled.div`
    overflow: hidden;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #fff;
`;

const Left = styled.div`
    overflow: hidden;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
`;

const Input = styled.input`
    padding: 5px;
    height: 100%;
    border: none;
`;

const StyledButton = styled.button`
    height: 100%;
    border: none;
    padding: 10px;
    background-color: var(--color-brand-600);
    color: #fff;
    border-radius: 50%;
    aspect-ratio: 1/1;
    margin-right: 5.7px;
`;

export default function Search() {
    return (
        <StyledSearch>
            <Left>
                <Input type="text" name="" id="" placeholder="destination" />
            </Left>
            <Input placeholder="Start date" type="date" name="" id="" />
            <Input placeholder="End date" type="date" name="" id="" />

            <Right>
                <StyledButton>
                    <HiMagnifyingGlass />
                </StyledButton>
            </Right>
        </StyledSearch>
    );
}
