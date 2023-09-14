import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    HiChartBar,
    HiChat,
    HiChatAlt,
    HiHeart,
    HiSearch,
    HiUser,
} from "react-icons/hi";
import {
    HiChatBubbleLeftEllipsis,
    HiChatBubbleLeftRight,
    HiChatBubbleOvalLeft,
    HiMiniChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMobileHeader = styled.div`
    width: 100%;
    height: 65px;
    bottom: 0;
    left: 0;
    z-index: 3000;
    position: fixed;
    background-color: #fff;
    display: flex;
    box-shadow: 0 -1px 17px 1px #8787872b;
`;

const MobileNavList = styled.div`
    display: flex;
    padding: 3px;
    justify-content: space-around;
    width: 100%;
`;

const ItemContainer = styled(NavLink)`
    height: 100%;
    flex: 0 0 calc(100% / 4);

    &.active svg {
        color: var(--color-brand-600);
    }
`;

const Item = styled.div`
    height: 100%;
    width: 100%;
    /* padding: ; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    color: #565656;

    & svg {
        /* width: 100%; */
        /* height: 100%; */
        width: 25px;
        height: 25px;
    }

    & .description {
        font-size: 1.2rem;
    }
`;

export default function MobileHeader() {
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        const scroll = function (e) {
            if (window.scrollY > 200) {
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
        <StyledMobileHeader>
            <MobileNavList>
                <ItemContainer to={"/client"}>
                    <Item>
                        <HiSearch />
                        <div className="description">Explore</div>
                    </Item>
                </ItemContainer>
                <ItemContainer to={"/account"}>
                    <Item>
                        <HiUser />
                        <div className="description">User</div>
                    </Item>
                </ItemContainer>
                <ItemContainer to={"/inbox"}>
                    <Item>
                        <HiMiniChatBubbleBottomCenterText />
                        <div className="description">Inbox</div>
                    </Item>
                </ItemContainer>
                <ItemContainer to={"/favorites"}>
                    <Item>
                        <HiHeart />
                        <div className="description">Favorites</div>
                    </Item>
                </ItemContainer>
            </MobileNavList>
        </StyledMobileHeader>,
        document.body
    );
}
