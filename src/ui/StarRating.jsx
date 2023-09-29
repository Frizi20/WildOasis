import { useState } from "react";
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
    
    & svg {
        ${(props) =>
            props?.$cursorPointer &&
            css`
                cursor: pointer;
            `}
    }

    & span {
        font-size: 2.4rem;
        padding: 0 20px;
    }
`;

export function StarRating({
    rating = 0,
    size = 25,
    nrStars = 5,
    color = "#00677a",
    onStarRatingChange,
    updateRating = false,
    className= ''
}) {
    const [currRating, setCurrRating] = useState(rating);
    const [tempRating, setTempRating] = useState(rating);
    const [isHovering, setIsHovering] = useState(false);

    const dinamicRating = isHovering ? tempRating : currRating;
    const fullStars = Math.floor(dinamicRating);
    const halfStarIndex =
        dinamicRating % fullStars !== 0 && rating !== 0 ? fullStars + 1 : false;

    function handleHover(index) {
        if (!updateRating) return;
        setIsHovering(true);
        setTempRating(index + 1);
    }

    function onMouseLeave() {
        if (!updateRating) return;

        setIsHovering(false);
    }

    function changeRating(index) {
        if (!updateRating) return;

        setCurrRating(index + 1);
        onStarRatingChange?.(index + 1);
    }

    return (
        <StarsContainer
            className={className}
            $starSize={size}
            $color={color}
            $cursorPointer={updateRating}
        >
            {Array.from({ length: nrStars }, (_, i) => {
                const Star =
                    i + 1 <= fullStars
                        ? ImStarFull
                        : halfStarIndex && i + 1 === halfStarIndex
                        ? ImStarHalf
                        : ImStarEmpty;

                return (
                    <Star
                        key={i}
                        onMouseEnter={() => {
                            handleHover(i);
                        }}
                        onMouseLeave={onMouseLeave}
                        onClick={() => {
                            changeRating(i);
                        }}
                    />
                );
            })}

            {updateRating && <span>{dinamicRating}</span>}
        </StarsContainer>
    );
}
