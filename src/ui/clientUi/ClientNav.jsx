import { styled } from "styled-components";
import { HiAdjustmentsHorizontal, HiHeart } from "react-icons/hi2";
import { PiMountains } from "react-icons/pi";
import { TbBeach, TbCactus } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ItemsCarusel from "../ItemsCarusel";
import { HiHome } from "react-icons/hi2";

const StyledNavLink = styled(NavLink)`
    &:hover {
        background-color: var(--color-grey-100);
        outline: 1px solid var(--color-grey-500);
        /* background-color: var(--color-grey-800); */
    }
    background-color: var(--color-grey-50);
    box-shadow: inset 0px 0px 1px #cbcbcb;
    color: var(--color-grey-800);

    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color: var(--color-grey-600);
        font-size: 1.4rem;
        font-weight: 500;
        padding: 0.5rem 1.4rem;
        /* transition: all 0.3s; */
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        /* color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm); */
    }

    & svg {
        width: 3rem;
        height: 3rem;
        /* color: var(--color-grey-400); */
        color: #707070;

        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-grey-500);
    }

    transition: none;

`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 765px) {
        display: none;
    }
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--color-indigo-700);
    color: var(--color-grey-700);
    background-color: #fff;
    border: 1px solid var(--color-grey-400);
    border-radius: 10px;
    padding: 5px 10px;
    gap: 10px;

    &:hover {
        cursor: pointer;
        background-color: #f4f4f4;
        box-shadow: var(--shadow-sm);
    }
`;

const Favorites = styled(Filter)`
    /* background-color: red; */
    & svg {
        color: #ff5d5d;
    }
`;

const Nav = styled.nav`
    display: flex;
    padding: 10px;
    height: 75px;
    justify-content: space-between;
    border: 1px solid gainsboro;
    background-color: #fff;
    gap: 20px;
`;

export default function ClientNav() {
    return (
        <Nav>
            <ItemsCarusel>
                <StyledNavLink>
                    <HiHome /> <span>All</span>
                </StyledNavLink>
                <StyledNavLink>
                    <PiMountains /> <span>Montain</span>
                </StyledNavLink>
                <StyledNavLink>
                    <TbBeach /> <span>Beach</span>
                </StyledNavLink>
                <StyledNavLink>
                    <TbCactus /> <span>Desert</span>
                </StyledNavLink>
                <StyledNavLink>
                    <FaSkiing /> <span>Sky</span>
                </StyledNavLink>
                <StyledNavLink>
                    <HiHome /> <span>All</span>
                </StyledNavLink>
                <StyledNavLink>
                    <PiMountains /> <span>Montain</span>
                </StyledNavLink>
                <StyledNavLink>
                    <TbBeach /> <span>Beach</span>
                </StyledNavLink>
                <StyledNavLink>
                    <TbCactus /> <span>Desert</span>
                </StyledNavLink>
                <StyledNavLink>
                    <FaSkiing /> <span>Sky</span>
                </StyledNavLink>
            </ItemsCarusel>

            <FilterContainer>
                <Favorites>
                    <HiHeart />
                    <span>Favorites</span>
                </Favorites>
                <Filter>
                    <HiAdjustmentsHorizontal />
                    <span>Filters</span>
                </Filter>
            </FilterContainer>
        </Nav>
    );
}
