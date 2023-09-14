import { styled } from "styled-components";
import BackButton from "../../ui/BackButton";
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 40px;
    padding-left: 0;
    position: relative;
`;
const H2 = styled.h2`
    color: #3f3f3f;
    font-size: 3.2rem;
    font-weight: 600;
`;
const ButtonContainer = styled.div`
    position: absolute;
    left: -20px;
    transform: translateX(-100%);
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
