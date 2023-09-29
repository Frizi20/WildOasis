import styled from "styled-components";

const StyledPageRow = styled.div`
    /* border-bottom: 1px solid gainsboro; */
    /* border: 1px solid gainsboro; */
    margin-bottom: 10px;
    padding: 10px 0;
    background-color: #fff;

    & .label {
        font-size: 1.7rem;
        font-weight: 500;
        margin-bottom: 5px;
    }

    & .value {
        margin-top: 5px;
    }

    & .edit {
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 600;
        border-bottom: 1px solid #444;
    }
`;

export default function PageRow({ children }) {
    return <StyledPageRow className="row"> {children} </StyledPageRow>;
}
