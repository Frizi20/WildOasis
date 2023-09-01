import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import { css, styled } from "styled-components";

const StarsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    color: #00677a;

    ${(props) =>
        props?.$starSize &&
        css`
            & svg {
                height: ${props.$starSize}px;
                width: ${props.$starSize}px;
            }
        `}

    ${(props) =>
        props?.$color &&
        css`
             color: ${props.$color};
        `}
`;

export function StarRating({ rating = 2.5, size = 25, nrStars = 5, color='#00677a' }) {
    const fullStars = Math.floor(rating);
    const halfStarIndex = rating % fullStars !== 0 ? fullStars + 1 : false;

    return (
        <StarsContainer $starSize={size} $color={color}>
            {Array.from({ length: nrStars }, (_, i) => {
                const Star =
                    i + 1 <= fullStars
                        ? ImStarFull
                        : halfStarIndex && i + 1 === halfStarIndex
                        ? ImStarHalf
                        : ImStarEmpty;

                return <Star key={i} />;
            })}
        </StarsContainer>
    );
}
