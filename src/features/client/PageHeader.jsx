import { styled } from "styled-components";
import BackButton from "../../ui/BackButton";
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 0 10px 0;
    padding-left: 0;
    position: relative;

    @media screen and (max-width: 725px){
        margin-left: 20px;
    }
`;
const H2 = styled.h2`
    color: #3f3f3f;
    font-size: 3.2rem;
    font-weight: 600;

    @media screen and (max-width: 725px){
        font-size: 2.2rem;
    }
`;
const ButtonContainer = styled.div`
    position: absolute;

    /* transform: translateY( calc(-100% - 10px) ); */
    left: -35px;

    /* transform: translateX(-100%); */
`;

export default function PageHeader({ children }) {
    return (
        <HeaderContainer type="horizontal">
            <ButtonContainer>
                <BackButton />
            </ButtonContainer>
            <H2>{children}</H2>
        </HeaderContainer>
    );
}
