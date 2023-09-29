import { css, styled } from "styled-components";
import Search from "./Search";
import Logo from "../Logo";

import { HiOutlineMenu } from "react-icons/hi";
import { useUser } from "../../features/authentication/useUser";
import ClientAvatar from "./css/ClientAvatar";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Modal from "../Modal";
import FiltersModal from "../../features/client/FiltersModal";
import useFilterQuery from "../../hooks/useFilterQuery";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    background-color: #fff;
    border-bottom: 1px solid #ececec;
    margin-bottom: 10px;
`;

const LogoContainer = styled.div`
    cursor: pointer;
`;

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    ${(props) =>
        props.$isMobile &&
        css`
            width: 100%;
        `}
`;

const FilterButton = styled.div`
    border-radius: 50%;
    /* flex: 1; */
    border: 1px solid gainsboro;
    height: 38px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    cursor: pointer;
    position: relative;

    & svg {
        height: 100px;
        width: 100px;
        /* flex: 0 0 20px; */
        /* color: red; */
        color: #757575;
    }

    & span {
        position: absolute;
        top: -10px;
        right: -4px;
        background-color: #fff;
        padding: 3px;
        border: 1px solid gainsboro;
        background-color: #424242;
        color: #fff;
        border-radius: 50%;
        aspect-ratio: 1/1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
    }
`;

export default function Header({ isMobile }) {
    const nrFilters = useFilterQuery(true, 800, "range", "guests", "property");

    return (
        <StyledHeader>
            {!isMobile && (
                <LogoContainer>
                    <Logo height={60} noTitle={true} />
                </LogoContainer>
            )}
            <StyledSearch $isMobile={isMobile}>
                <Search isMobile={isMobile} />
                {isMobile && (
                    <Modal>
                        <Modal.Open opens="filters">
                            <FilterButton>
                                <HiOutlineAdjustmentsHorizontal />
                                {nrFilters > 0 && <span>3</span>}
                            </FilterButton>
                        </Modal.Open>
                        <Modal.Window name="filters">
                            <FiltersModal />
                        </Modal.Window>
                    </Modal>
                )}
            </StyledSearch>

            {!isMobile && <ClientAvatar />}
        </StyledHeader>
    );
}
