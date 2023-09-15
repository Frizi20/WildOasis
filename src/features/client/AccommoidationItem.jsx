import { css, styled } from "styled-components";
import styles from "./Accommodation.module.css";
import { HiStar, HiOutlineHeart } from "react-icons/hi2";
import { useFavorites } from "../../context/FavoritesContext";
import Slider from "../../ui/Slider";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { formatCurrency } from "../../utils/helpers";
import dayjs from "dayjs";

const StyledAccommoidationItem = styled(Link)`
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        /* box-shadow: 0px 0px 16px 1px gainsboro; */
    }

    & .img-container {
        position: relative;
    }

    & .favorite-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    }

    & .favorite-btn svg {
        width: 25px;
        height: 25px;
        color: #fff;
        fill: #1f1f1f8c;

        ${(props) =>
            props.$isFavorite &&
            css`
                fill: #ff3f3fe1;
            `}
    }
`;

export default function AccommoidationItem({ accommodation }) {
    const showSliderGalery = useMediaQuery({ query: "(max-width: 1090px)" });

    const [isHovered, setIsHovered] = useState(false);
    const { regularPrice, reviews, id, images, location,title, description } = accommodation;

    console.log(accommodation);
    const { toggleItem, favoriteItems } = useFavorites();

    const isFavorite = favoriteItems.includes(id);
    const nrReviews = reviews.length;
    const review =
        Math.round(
            reviews.reduce((acc, currReview) => {
                return acc + currReview.rating / nrReviews;
            }, 0) * 10
        ) / 10;
    const hasReview = review !== 0;

    const queryString = `?startDate=${dayjs(
        new Date()
    ).toISOString()}&endDate=${dayjs(new Date())
        .add(2, "day")
        .toISOString()}&adults=1`;

    return (
        <StyledAccommoidationItem
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
            $isFavorite={isFavorite}
            className={styles.acc}
            to={`booking/${accommodation.id}/${queryString}`}
        >
            <div className="img-container">
                <div
                    className="favorite-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleItem(accommodation.id);
                    }}
                >
                    <HiOutlineHeart />
                </div>
                <Slider
                    images={images}
                    isHovered={showSliderGalery || isHovered}
                />
            </div>
            <div className="details">
                <div className="location-rating">
                    <div className="location"> {location} </div>
                    <div className="rating">
                        <HiStar />
                        <span> {hasReview ? review : "New"} </span>
                    </div>
                </div>

                <div className="price-max">
                    <div className="suggestion-interval">
                        {/* <span className="from">10 Sept</span>-
                        <span className="to">20 Sept</span> */}
                        {title}
                    </div>
                </div>

                <div className="price-details">
                    <span>{formatCurrency(regularPrice)}$</span> night
                </div>
            </div>
        </StyledAccommoidationItem>
    );
}
