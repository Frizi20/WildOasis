import { css, styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import useCabin from "../cabins/useCabin";
import { HiHeart, HiStar } from "react-icons/hi2";
import styles from "./AccommodationDetails.module.css";
import { StyledBtn } from "../../ui/clientUi/ClientNav";
import Facilities from "./Facilities";
import Reviews from "./Reviews";
import { useState } from "react";
import ReviewsList from "./ReviewsList";
import RoomsList from "./RoomsList";
import ReservationModal from "./ReservationModal";
import NoReviews from "../../ui/clientUi/NoReviews";
import AddReview from "./AddReview";
import { useFavorites } from "../../context/FavoritesContext";
import GaleryDesktop from "../../ui/GaleryDesktop";
import Slider from "../../ui/Slider";
import { useMediaQuery } from "react-responsive";
import BackButton from "../../ui/BackButton";
import { useSettings } from "../settings/useSettings";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import MobileHeader from "../../ui/clientUi/MobileHeader";
import MakeReservationMobile from "./MakeReservationMobile";
import { useUser } from "../authentication/useUser";

const PageWrapper = styled.div`
    width: 1100px;
    max-width: 100%;
    margin: 0 auto;
    padding-bottom: 150px;
`;

const GeneralDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;

    .general-details-container {
        /* background-color: red; */
        margin-top: 15px;
        padding-bottom: 15px;
    }

    @media screen and (max-width: 750px) {
        flex-direction: column-reverse;
        border-bottom: 1px solid gainsboro;

        & .container{
            margin-left: -20px;
            margin-right: -20px;
        }
    }
`;

const GeneralDetails = styled.div`
    position: relative;

    & .title {
        padding: 5px 0 1px 0;
    }

    & .back-btn {
        position: absolute;
        left: -35px;
        top: 3px;
    }

    & .general-details {
        padding: 10px 0;
    }

    ${(props) =>
        props.$isFavorite &&
        css`
            & .btns svg {
                fill: #ff5d5d;
            }
        `}

    @media screen and (max-width: 750px) {
        & .back-btn {
            position: absolute;
            left: -20px;
            top: 2px;
        }

        & .title {
            padding: 5px 0 1px 15px;
        }
    }
`;

const DetailsWrapper = styled.div`
    /* height: 1400px; */
    /* margin-top: 30px; */
    /* border: 1px solid gainsboro; */
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    /* background:red; */
`;

const Details = styled.div`
    display: flex;
    flex: 1;
    /* border: 1px solid gainsboro; */
    display: flex;
    flex-direction: column;

    & .overview {
        display: flex;
        padding: 10px 0 15px 0;
        border-bottom: 1px solid gainsboro;
    }

    & .rooms {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        /* gap: 20px; */
        /* padding: 10px 0; */
    }

    & .rooms span:not(:first-child) {
        padding: 0 10px;
    }

    & .hoast-name-rooms {
        flex: 1;

        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 10px 0;
        gap: 3px;
    }

    & .hoast-name-rooms h2 {
        /* background-color: red; */
        font-size: 1.8rem;
        color: var(--color-grey-700);
        /* padding-top: 10px; */
    }

    & .hoast-details {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 0 0 100px;
        padding: 15px;
        gap: 5px;
    }

    & .hoast-details .hoast-avatar {
        /* flex: 1; */
        /* aspect-ratio: 1/1; */
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid grey;

        height: 50px;
        width: 50px;
    }

    & .activity {
        font-size: 1.3rem;
    }
    /* align-items: center; */
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 0 20px;
    border-bottom: 1px solid gainsboro;

    & p {
        font-size: 1.4rem;
        line-height: 2.2rem;
    }

    & h3 {
        padding-bottom: 5px;
    }

    ${(props) =>
        props?.$border === "none" &&
        css`
            border: none;
        `}

    ${(props) => {
        props?.$margin &&
            css`
                margin-top: ${props.margin}px;
                /* background-color: red; */
            `;
    }}
`;

const DescriptionContainer = styled.div``;

const ShowMoreBtn = styled.span`
    color: gray;
    cursor: pointer;
    padding: 0 5px;
    display: block;
    text-align: right;
    padding: 1px 7px;
    border: 1px solid gainsboro;
    width: fit-content;
    margin-top: 10px;
    margin-top: 9px;
`;

const HorizontalWrapper = styled.div`
    display: flex;
    position: relative;
    border-bottom: 1px solid gainsboro;
`;

const StyledButton = styled.div`
    margin-top: 50px;
    text-align: center;
`;

function userReviewedOrVisted(guestId, bookings, reviews) {
    const userReviewed = reviews.find((review) => {
        return !!(review.userId === guestId);
    });

    if (userReviewed) return;

    return bookings.find((booking) => booking.guestId == guestId)
        ? true
        : false;
}

export default function AccommodationDetails() {
    const showSliderGalery = useMediaQuery({ query: "(max-width: 1090px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 862px)" });

    const [showMore, setShowMore] = useState(false);

    const { isLoading, data: accommodation } = useCabin();
    const { favoriteItems, toggleItem } = useFavorites();
    const { isLoadingSettings, settings } = useSettings();
    const { user } = useUser();

    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        description,
        reviews,
        title,
        location,
        cabins_facilities,
        images,
        cabin_bookings,
    } = accommodation;

    const canAddReview = userReviewedOrVisted(
        user?.id,
        cabin_bookings,
        reviews
    );

    const display_name = accommodation?.profile?.display_name;
    const avatar = accommodation?.profile?.avatar || "/default-user.jpg";
    const isFavorite = favoriteItems.includes(accommodation.id);

    const nrReviews = reviews.length;
    const grade =
        Math.round(
            reviews.reduce(
                (acc, review) => acc + review.rating / nrReviews,
                0
            ) * 10
        ) / 10;

    return (
        <PageWrapper>
            <GeneralDetailsContainer className={styles.acc}>
                <GeneralDetails
                    $isFavorite={isFavorite}
                    className="general-details-container"
                >
                    <div className="back-btn">
                        <BackButton />
                    </div>
                    <div className="title"> {title} </div>
                    <div className="general-details">
                        <div className="info">
                            <div className="rating">
                                <HiStar /> {nrReviews < 1 ? "New" : grade}
                            </div>
                            {nrReviews > 0 && (
                                <>
                                    <div className="dot">
                                        <> &middot;</>
                                    </div>
                                    <div className="reviews">
                                        {reviews.length} reviews
                                    </div>
                                    <div className="dot">
                                        <> &middot;</>
                                    </div>
                                </>
                            )}
                            <div className="location">{location}</div>
                        </div>
                        <div className="btns">
                            <StyledBtn
                                $isMobile={isMobile}
                                onClick={() => {
                                    toggleItem(accommodation.id);
                                }}
                            >
                                <HiHeart /> <span>Salveaza</span>
                            </StyledBtn>
                        </div>
                    </div>
                </GeneralDetails>

                {showSliderGalery ? (
                    <div className="container" style={{ position: "relative" }}>
                        <Slider images={images} isHovered={true} />
                    </div>
                ) : (
                    <GaleryDesktop images={images} />
                )}
            </GeneralDetailsContainer>

            <DetailsWrapper>
                <HorizontalWrapper>
                    <Details>
                        <div className="overview">
                            <div className="hoast-name-rooms">
                                <h2>Hoasted by {display_name}</h2>

                                <div className="rooms">
                                    <span>2 bedrooms &bull;</span>

                                    <span>1 bathrooms &bull;</span>

                                    <span>5 beds &bull; </span>

                                    <span>1 kitchen </span>
                                </div>
                            </div>

                            <div className="hoast-details">
                                <div className="hoast-avatar">
                                    <img src={avatar} alt="" />
                                </div>
                                <div className="activity">3 years</div>
                            </div>
                        </div>

                        <Row>
                            <h3>Description</h3>

                            <>
                                <p>
                                    {showMore || description.length < 400
                                        ? description
                                        : description.slice(0, 400) + " ..."}
                                    {description.length > 400 && (
                                        <ShowMoreBtn
                                            onClick={() => {
                                                setShowMore((p) => !p);
                                            }}
                                        >
                                            {showMore
                                                ? "show less -"
                                                : "show more +"}
                                        </ShowMoreBtn>
                                    )}
                                </p>
                            </>
                        </Row>

                        <Facilities facilities={cabins_facilities} />

                        <Row $border="none" $margin={20}>
                            <h3>Rooms</h3>
                            <RoomsList />
                        </Row>
                    </Details>
                    {!isMobile && (
                        <ReservationModal
                            accommodation={accommodation}
                            settings={settings}
                        />
                    )}
                </HorizontalWrapper>

                {reviews.length > 0 ? (
                    <>
                        <Reviews reviews={reviews} />
                        <ReviewsList reviews={reviews} />
                        {/* <Reviews/> */}
                    </>
                ) : (
                    <NoReviews />
                )}

                <Modal>
                    <Modal.Open opens="add-review">
                        <StyledButton>
                            {canAddReview && (
                                <Button size="large" $color="#3d3d3d">
                                    Add review
                                </Button>
                            )}
                        </StyledButton>
                    </Modal.Open>
                    <Modal.Window name="add-review">
                        <AddReview />
                    </Modal.Window>
                </Modal>
            </DetailsWrapper>

            {isMobile && (
                <MobileHeader type={"static"} height={85}>
                    <MakeReservationMobile
                        accommodation={accommodation}
                        settings={settings}
                        cabinId={accommodation.id}
                    />
                </MobileHeader>
            )}
        </PageWrapper>
    );
}
