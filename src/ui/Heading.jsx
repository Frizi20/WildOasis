import { css, styled } from "styled-components";

// const text = css`
//     text-align: center;
//     ${10 > 5 && `background-color:yellow`}
// `;

export default styled.h1`
    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 4rem !important;
            font-weight: 700;
            color: #0c3a56;
        `}

    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.as === "h3" &&
        css`
            font-size: 1rem;
            font-weight: 500;
        `}
    
    ${(props) =>
        props.as === "h4" &&
        css`
            font-size: 3rem;
            font-weight: 600;
            text-align: center;
        `}

    ${(props) =>
        props.as === "h5" &&
        css`
            font-size: 20px !important;
            font-weight: 500;
        `}

    

    font-size: ${10 > 5 ? "30px" : "5px"};
    font-weight: 600;
`;
