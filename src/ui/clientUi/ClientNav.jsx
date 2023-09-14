import { css, styled } from "styled-components";
import { HiAdjustmentsHorizontal, HiHeart } from "react-icons/hi2";
import { PiMountains } from "react-icons/pi";
import { TbBeach, TbCactus } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ItemsCarusel from "../ItemsCarusel";
import { HiHome } from "react-icons/hi2";
import { useFavorites } from "../../context/FavoritesContext";

const StyledNavLink = styled(NavLink)`
    display: flex;
    flex-direction: column;

    &:hover {
        background-color: var(--color-grey-100);
        /* outline: 1px solid var(--color-grey-500); */
        /* background-color: var(--color-grey-800); */
    }
    /* background-color: var(--color-grey-50); */
    box-shadow: inset 0px 0px 1px #cbcbcb;
    color: var(--color-grey-800);

    &:link,
    &:visited {
        display: flex;
        align-items: center;
        /* gap: 1.2rem; */
        color: var(--color-grey-600);
        font-size: 1.4rem;
        font-weight: 500;
        padding: 0.5rem 2rem;
        min-width: 90px;

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
        width: 2rem;
        height: 2rem;
        /* color: var(--color-grey-400); */
        color: #707070;
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-grey-500);
    }

    &.active svg {
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

export const StyledBtn = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--color-indigo-700);
    color: var(--color-grey-700);
    background-color: #fff;
    border: 1px solid var(--color-grey-400);
    border-radius: 10px;
    padding: 5px 10px;
    gap: 10px;
    font-size: 1.3rem;

    &:hover {
        cursor: pointer;
        background-color: #f4f4f4;
        box-shadow: var(--shadow-sm);
    }

    ${(props) =>
        props.$isFavorite &&
        css`
            fill: #ff5d5d;
            background-color: red;
        `}
`;

const Favorites = styled(StyledBtn)`
    position: relative;

    & svg {
        color: #ff5d5d;
    }

    & span {
        position: absolute;
        top: -12px;
        right: -5px;
        padding: 5px;
        background-color: #fff;
        background-color: #ff5d5d;
        border-radius: 50%;
        aspect-ratio: 1/1;
        height: 23px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.2rem;
    }
`;

const Nav = styled.nav`
    display: flex;
    padding: 10px 0;
    height: 75px;
    justify-content: space-between;
    /* border: 1px solid gainsboro; */
    background-color: #fff;
    gap: 20px;
`;

export default function ClientNav() {
    const { favoriteItems } = useFavorites();
    const favoriteItemsCount = favoriteItems.length;

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
                    <div>Favorites</div>
                    {favoriteItems.length > 0 && (
                        <span>{favoriteItemsCount}</span>
                    )}
                </Favorites>
                <StyledBtn>
                    <HiAdjustmentsHorizontal />
                    <span>Filters</span>
                </StyledBtn>
            </FilterContainer>
        </Nav>
    );
}
