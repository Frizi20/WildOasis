import { styled } from "styled-components"


const StyledFooter = styled.footer`
    flex: 0 0 200px;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Footer() {
    return (
        <StyledFooter>
            This is the footer
        </StyledFooter>
    )
}

