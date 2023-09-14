/* eslint-disable react/prop-types */
import { css, styled } from "styled-components";

const StyledFormRow = styled.div`
    grid-template-columns: 24rem 2fr 1fr;

    ${(props) => {
        return (
            props.$grid &&
            css`
                grid-template-columns: ${props.$grid};
            `
        );
    }}

    display: grid;
    align-items: center;
    gap: 2.4rem;
    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

const Label = styled.label`
    font-weight: 500;
`;

export default function FormRow({ label, error, children, $grid }) {
    return (
        <StyledFormRow $grid={$grid}>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <Error> {error} </Error>}
        </StyledFormRow>
    );
}
