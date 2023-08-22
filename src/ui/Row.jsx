import { styled, css } from "styled-components";

const Row = styled.div`
    display: flex;

    ${(props) =>
        props.type === "horizontal" &&
        css`
            flex-direction: row;
            justify-content: space-between;
        `}

    ${(props) =>
        props.type === "vertical" &&
        css`
            display: flex;
            flex-direction: column;
        `}


`;

Row.defaultProps = {
    type: "vertical",
};

export default Row;
