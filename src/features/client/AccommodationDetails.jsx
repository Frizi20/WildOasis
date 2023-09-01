import { css, styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import useCabin from "../cabins/useCabin";
import { HiHeart, HiStar } from "react-icons/hi2";
import styles from "./AccommodationDetails.module.css";
import { StyledBtn } from "../../ui/clientUi/ClientNav";
import FaclitiesList from "./FaclitiesList";
import Reviews from "./Reviews";
import { useState } from "react";
import ReviewsList from "./ReviewsList";
import RoomsList from "./RoomsList";
import ReservationModal from "./ReservationModal";
import NoReviews from "../../ui/clientUi/NoReviews";

const PageWrapper = styled.div`
    width: 1100px;
    max-width: 100%;
    margin: 0 auto;
`;

const GeneralDetailsContainer = styled.div``;

const GeneralDetails = styled.div`
    border: 1px solid gainsboro;

    & .title {
        padding: 5px 0;
    }
`;

const GalleryContainer = styled.div`
    /* height: 500px; */
    /* border: 1px solid gainsboro; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 10px;

    & div {
        border: 1px solid gainsboro;
    }

    & div:first-child {
        grid-area: 1/1/3/3;
    }

    & img {
        /* width: 20px; */
        object-fit: cover;
        height: 100%;
    }

    @media screen and (max-width: 1090px) {
        & div:not(:first-child) {
            display: none;
        }
        & div:first-child {
            grid-area: 1/1/4/5;
        }
    }
`;

const DetailsWrapper = styled.div`
    /* height: 1400px; */
    margin-top: 30px;
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
        padding: 30px 0 15px 0;
        border-bottom: 1px solid gainsboro;
    }

    & .rooms {
        display: flex;
        align-items: center;
        gap: 10px;
        /* gap: 20px; */
        /* padding: 10px 0; */
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
        font-size: 2.1rem;
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
        flex: 1;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid grey;

        height: 40px;
        width: 40px;
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

export default function AccommodationDetails() {
    const { isLoading, data: accommodation } = useCabin();
    const [showMore, setShowMore] = useState(false);

    if (isLoading) return <Spinner />;

    const { description, reviews } = accommodation;

    const display_name = accommodation?.profile?.display_name;
    const avatar = accommodation?.profile?.avatar || "/default-user.jpg";

    return (
        <PageWrapper>
            <GeneralDetailsContainer className={styles.acc}>
                <GeneralDetails>
                    <div className="title">A nice place to visit</div>
                    <div className="general-details">
                        <div className="info">
                            <div className="rating">
                                <HiStar /> 4.65
                            </div>
                            <div className="dot">
                                <> &middot;</>
                            </div>
                            <div className="reviews">
                                <strong>241</strong> reviews
                            </div>
                            <div className="dot">
                                <> &middot;</>
                            </div>
                            <div className="location">
                                Brasov, pe undeva prin centru
                            </div>
                        </div>
                        <div className="bnts">
                            <StyledBtn>
                                <HiHeart /> Save
                            </StyledBtn>
                        </div>
                    </div>
                </GeneralDetails>
                <GalleryContainer>
                    <div>
                        <img
                            className="first-img"
                            src={accommodation.image}
                            alt=""
                        />
                    </div>
                    <div>
                        <img src={accommodation.image} alt="" />
                    </div>
                    <div>
                        <img src={accommodation.image} alt="" />
                    </div>
                    <div>
                        <img src={accommodation.image} alt="" />
                    </div>
                    <div>
                        <img src={accommodation.image} alt="" />
                    </div>
                </GalleryContainer>
            </GeneralDetailsContainer>

            <DetailsWrapper>
                <HorizontalWrapper>
                    <Details>
                        <div className="overview">
                            <div className="hoast-name-rooms">
                                <h2>Hoasted by {display_name}</h2>

                                <div className="rooms">
                                    <span>2 bedrooms</span>
                                    <span>1 bathrooms</span>
                                    <span>5 beds </span>
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
                                    {showMore
                                        ? description
                                        : description.slice(0, 400) + " ..."}
                                    <ShowMoreBtn
                                        onClick={() => {
                                            setShowMore((p) => !p);
                                        }}
                                    >
                                        {showMore
                                            ? "show less -"
                                            : "show more +"}
                                    </ShowMoreBtn>
                                </p>
                            </>
                        </Row>

                        <Row>
                            <h3>Facilities</h3>
                            <FaclitiesList
                                facilities={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            />
                        </Row>

                        <Row $border="none">
                            <h3>Rooms</h3>
                            <RoomsList />
                        </Row>
                    </Details>

                    <ReservationModal accommodation={accommodation} />
                </HorizontalWrapper>
                {reviews.length > 0 ? (
                    <>
                        <Reviews reviews={reviews} />
                        <ReviewsList reviews={reviews} />
                    </>
                ) : (
                    <NoReviews />
                )}
            </DetailsWrapper>
        </PageWrapper>
    );
}
