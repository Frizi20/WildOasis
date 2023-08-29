import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import useCabin from "../cabins/useCabin";
import { HiHeart, HiStar } from "react-icons/hi2";
import styles from "./AccommodationDetails.module.css";
import { StyledBtn } from "../../ui/clientUi/ClientNav";
import FaclitiesList from "./FaclitiesList";
import Reviews from "./Reviews";

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
    border: 1px solid gainsboro;
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
            grid-area: 1/-1/1/-1;
        }
    }
`;

const DetailsWrapper = styled.div`
    height: 1400px;
    margin-top: 30px;
    border: 1px solid gainsboro;
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* background:red; */
`;

const Details = styled.div`
    display: flex;
    flex: 1;
    border: 1px solid gainsboro;
    display: flex;
    flex-direction: column;

    & .overview {
        display: flex;
        padding: 30px 0 15px 0;
        border-bottom: 1px solid gainsboro;
    }

    & .rooms {
        display: flex;
        gap: 20px;
        padding: 10px 0;
    }

    & .hoast-name-rooms {
        flex: 1;
        border: 1px solid gainsboro;
    }

    & .hoast-details {
        border: 1px solid gainsboro;
        /* width: 75px; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 0 0 100px;
        padding: 5px;
        gap: 5px;
    }

    & .hoast-details .hoast-avatar {
        flex: 1;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid grey;
    }

    & .activity {
        font-size: 1.3rem;
    }
    /* align-items: center; */
`;
const ReserveModalContainer = styled.div`
    background-color: #ffffff;
    flex: 0 0 33%;
    position: relative;
    padding: 15px 0 15px 50px;

    & .reserve {
        position: sticky;
        top: 200px;
        border-radius: 20px;
        height: 400px;
        border: 1px solid gainsboro;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 0 20px ;
    border-bottom: 1px solid gainsboro;

    & p{
        font-size: 1.3rem;
    }
`

const DescriptionContainer = styled.div``;

export default function AccommodationDetails() {
    const { isLoading, data: accommodation } = useCabin();

    if (isLoading) return <Spinner />;

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
                <Details>
                    <div className="overview">
                        <div className="hoast-name-rooms">
                            <h2>Hoasted by Jhon Smith</h2>

                            <div className="rooms">
                                <span>2 bedrooms</span>
                                <span>1 bathrooms</span>
                                <span>5 beds </span>
                                <span>1 kitchen </span>
                            </div>
                        </div>

                        <div className="hoast-details">
                            <div className="hoast-avatar">MC</div>
                            <div className="activity">3 years</div>
                        </div>
                    </div>

                    <Row>
                        <h3>Description</h3>
                        <p>  {accommodation.description} </p>
                    </Row>

                    <Row>
                        <h3>Facilities</h3>
                        <FaclitiesList facilities={[0,1,2,3,4,5,6,7,8,9]} />
                    </Row>
                    <Row>
                        <h3>Reviews</h3>
                        <Reviews/>
                    </Row>
                </Details>

                <ReserveModalContainer>
                    <div className="reserve"></div>
                </ReserveModalContainer>
            </DetailsWrapper>
        </PageWrapper>
    );
}
