import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
    text-align: center;
    height: 9.6rem;

    ${(props) =>
        props.$height &&
        css`
            height: ${props.$height}px;
        `}
`;

const Img = styled.img`
    height: 100%;
    object-fit: contain;
`;

function Logo({ height }) {
    const { isDarkMode } = useDarkMode();
    const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
    return (
        <StyledLogo $height={height}>
            <Img src={src} alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
