import styled, { css } from "styled-components";
import BasicRow from "../../ui/Row";


const Row = styled(BasicRow)`
    padding: 10px 0;
    font-size: 1.5rem;
    align-items: baseline;

    ${(props) =>
        props.margin &&
        css`
            margin: ${props.margin};
        `}
`;

export default Row