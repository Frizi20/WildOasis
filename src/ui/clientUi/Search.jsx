import { css, styled } from "styled-components";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";

const StyledSearch = styled.div`
    display: flex;
    background-color: #ffffff;
    padding: 2px;
    border-radius: 50px;
    border: 1px solid gainsboro;
    position: relative;
    box-shadow: 0px 1px 0px 0px #dcdcdcb0;

    ${(props) =>
        props.$isMobile &&
        css`
            width: 100%;
        `}
`;

const Right = styled.div`
    overflow: hidden;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #fff;
    padding-left: 10px;
`;

const Left = styled.div`
    overflow: hidden;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;

    ${(props) =>
        props.$isMobile &&
        css`
            width: 100%;
        `}
`;

const Input = styled.input`
    padding: 5px 15px;
    height: 100%;
    border: none;

    outline: 1px gray;

    position: relative;

    ${(props) =>
        props.border === "center" &&
        css`
            &::before {
                content: "";
                height: 90%;
                background-color: #b1b1b1;
                width: 1px;
                position: absolute;
                left: 0;
            }
            &::after {
                content: "";
                height: 90%;
                background-color: #b1b1b1;
                width: 1px;
                position: absolute;
                right: 0;
            }
        `}

    ${(props) =>
        props.radius === "left" &&
        css`
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            /* width: 140px; */
        `}

    ${(props) =>
        props.radius === "right" &&
        css`
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
        `}


    
    @media screen and (max-width: 700px) {
        ${(props) =>
            props.$hide === true &&
            css`
                display: none;
            `}
    }

    &:focus {
        outline: none;
    }

    &::placeholder {
        padding-left: 10px;
    }
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

export default function Search({ isMobile }) {
    return (
        <StyledSearch $isMobile={isMobile}>
            <Left $isMobile={isMobile}>
                <Input
                    radius="left"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search..."
                />
            </Left>
            {/* <Input
                $hide={true}
                border="center"
                placeholder="Start date"
                type="date"
                name=""
                id=""
            /> */}
            {/* <Input
                radius="right"
                placeholder="End date"
                type="date"
                name=""
                id=""
            /> */}

            <Right>
                <StyledButton>
                    <HiMagnifyingGlass />
                </StyledButton>
            </Right>
        </StyledSearch>
    );
}
