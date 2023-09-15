import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styled, { css } from "styled-components";

const StyledMobileHeader = styled.div`
    width: 100%;
    height: 85px;
    bottom: 0;
    left: 0;
    z-index: 3000;
    position: fixed;
    background-color: #fff;
    display: flex;
    box-shadow: 0 -1px 17px 1px #8787872b;

    ${(props) =>
        props.$height &&
        css`
            height: ${props.$height}px;
        `}
`;

export default function MobileHeader({
    children,
    type = "dynamic",
    height = 65,
}) {
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        const scroll = function (e) {
            if (type === "static") return;

            if (window.scrollY > 300) {
                setShowMenu(false);
            } else {
                setShowMenu(true);
            }
        };

        window.addEventListener("scroll", scroll);

        return () => {
            window.removeEventListener("scroll", scroll);
        };
    }, []);

    if (!showMenu) return null;

    return createPortal(
        <StyledMobileHeader $height={height}>{children}</StyledMobileHeader>,
        document.body
    );
}
