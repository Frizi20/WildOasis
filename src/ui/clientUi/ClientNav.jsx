import { styled } from "styled-components";
import ButtonIcon from "../ButtonIcon";
import { HiAcademicCap, HiArchiveBox, HiArchiveBoxArrowDown, HiBackward, HiHome, HiOutlineFolderOpen } from "react-icons/hi2";
import { StyledNavLink } from "../MainNav";
import Filter from "../Filter";

const Nav = styled.nav`
    display: flex;
    padding: 10px;
    /* justify-content: space-between; */
    border: 1px solid gainsboro;
    background-color: #fff;
`;

const ListUl = styled.ul`
    flex: 1;
    display: flex;
    gap: 10px;
`;

export default function ClientNav() {
    return (
        <Nav>
            <ListUl>
                <StyledNavLink>
                    <HiHome />
                </StyledNavLink>
                <StyledNavLink>
                    <HiOutlineFolderOpen />
                </StyledNavLink>
                <StyledNavLink>
                    <HiAcademicCap />
                </StyledNavLink>
                <StyledNavLink>
                    <HiArchiveBoxArrowDown />
                </StyledNavLink>
                <StyledNavLink>
                    <HiArchiveBox />
                </StyledNavLink>
                <StyledNavLink>
                    <HiBackward />
                </StyledNavLink>
            </ListUl>
            <Filter
                filterField={"discount"}
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />
        </Nav>
    );
}
