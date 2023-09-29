import { css, styled } from "styled-components";
import CreditCardForm from "./CreditCardForm";
import useQueryParams from "../../hooks/useQueryParams";
import Button from "../../ui/Button";
import { HiStar } from "react-icons/hi2";
import { useParams, useSearchParams } from "react-router-dom";
import useCabin from "../cabins/useCabin";
import Spinner from "../../ui/Spinner";
import dayjs from "dayjs";
import { formatDate } from "./UserReview";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import DateInterval from "./DateInterval";
import { useEffect, useState } from "react";
import GuestsForm from "./Counters";
import Counters from "./Counters";

import { useUser } from "../authentication/useUser";
import useCreateBooking from "../bookings/useCreateBooking";
import PageRow from "../../ui/clientUi/PageRow";
import Row from "../../ui/clientUi/Row";

const Container = styled.div`
    display: flex;
    padding-bottom: 50px;

    @media screen and (max-width: 1012px) {
        flex-direction: column-reverse;
    }
    /* min-height: 500px; */
`;

const DetailsContainer = styled.div`
    flex: 0 0 50%;
`;

const OverviewContainer = styled.div`
    flex: 1;
    padding-left: 50px;
    position: relative;

    @media screen and (max-width: 1012px) {
        padding: 0;
    }
`;

const OverviewModal = styled.div`
    width: 100%;
    padding: 20px;
    border: 1px solid gainsboro;
    border-radius: 15px;
    position: sticky;
    top: 50px;

    & .accommodation {
        display: flex;
    }

    & .image {
        width: 200px;
        border-radius: 5px;
        overflow: hidden;
    }

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & .accommodation .details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 20px;
    }

    & .reviews {
        display: flex;
        justify-self: self-end;
        gap: 5px;
    }

    & .pricing-details {
        margin-top: 20px;
        border-top: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        padding: 10px 0 5px 0;
    }

    & .pricing-details .header {
        font-size: 2.2rem;
    }

    & .pricing-details .row {
        display: flex;
        justify-content: space-between;

        font-size: 1.5rem;
        padding: 5px 0;
    }

    & .total {
        display: flex;
        padding-top: 20px;
        font-size: 1.8rem;
        justify-content: space-between;
        font-weight: 500;
    }
`;

export const Heading = styled.h2`
    font-size: 2.5rem;
    font-weight: 500;
    padding: 20px 0;
`;


export default function BookingDetails() {
    const { startDate: startDateQuery, endDate: endDateQuery } = useQueryParams(
        "startDate",
        "endDate",
        "guestsCount"
    );

    const [searchParams, setSearchParams] = useSearchParams();

    const [startDate, setStartDate] = useState(() => {
        return dayjs(startDateQuery).format();
    });
    const [endDate, setEndDate] = useState(() => {
        return dayjs(endDateQuery).format();
    });

    const nrNights = dayjs(endDate).diff(dayjs(startDate), "day");

    const [nrGuests, setNrGuests] = useState(0);

    const { isLoading, data } = useCabin({ userId: "2" });
    const { isLoading: isLoadingSettings, settings: { serviceFee } = {} } =
        useSettings();

    const { user, isLoading: isLoadingUser } = useUser();

    const { createBooking, isLoading: isCreatingBooking } = useCreateBooking();

    useEffect(() => {
        searchParams.set("startDate", dayjs(startDate).format());
        searchParams.set("endDate", dayjs(endDate).format());

        setSearchParams(searchParams, { replace: true });
    }, [startDate, endDate, searchParams, setSearchParams]);

    if (isLoading || isLoadingSettings || isLoadingUser) return <Spinner />;

    const {
        images,
        location,
        title,
        profile,
        regularPrice,
        reviews,
        id: cabinId,
    } = data;

    const avgReviews =
        Math.round(
            reviews.reduce(
                (acc, curr) => acc + curr.rating / reviews.length,
                0
            ) * 100
        ) / 100;

    function handleGuestsChange(nrGuests) {
        setNrGuests(nrGuests);
    }

    function updateBooking() {
        createBooking({
            cabinPrice: serviceFee + regularPrice * nrNights * nrGuests,
            status: "unconfirmed",
            numNights: nrNights,
            numGuests: nrGuests,
            startDate: dayjs(startDate)
                .startOf("day")
                .format("YYYY-MM-DD HH:mm:ss"),
            endDate: dayjs(endDate)
                .startOf("day")
                .format("YYYY-MM-DD HH:mm:ss"),
            guestId: user?.id,
            cabinId: cabinId,
            hasBreakfast: false,
            isPaid: false,
            observations: "I have a peanut allergy",
            extrasPrice: 0,
            totalPrice: serviceFee + regularPrice * nrNights * nrGuests,
        });
    }

    return (
        <Container>
            <DetailsContainer>
                <PageRow>
                    <Heading>Your trip</Heading>
                    <Modal>
                        <Row type="horizontal">
                            <div>
                                <div className="label">Date interval</div>
                                <div className="value">
                                    {dayjs(startDate).format("DD MMMM")} -{" "}
                                    {dayjs(endDate).format("DD MMMM")}
                                </div>
                            </div>
                            <Modal.Open opens="edit-interval">
                                <div className="edit">Edit</div>
                            </Modal.Open>
                            <Modal.Window
                                name="edit-interval"
                                closeOutisde={false}
                            >
                                <DateInterval
                                    startDate={startDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    setStartDate={setStartDate}
                                />
                            </Modal.Window>
                        </Row>
                        <Row type="horizontal">
                            <Counters
                                opened={true}
                                isInModal={true}
                                onChange={handleGuestsChange}
                            >
                                <div>
                                    <div className="label">Guests</div>
                                    <Counters.Label />
                                </div>
                                <Modal.Open
                                    opens={"edit-people"}
                                    closeOutisde={false}
                                >
                                    <div className="edit">Edit</div>
                                </Modal.Open>
                                <Modal.Window name="edit-people">
                                    {/* <GuestsForm
                                        guestsState={guests}
                                        setGuests={setGuests}
                                    /> */}
                                    <Counters.GuestsForm />
                                </Modal.Window>
                            </Counters>
                        </Row>
                    </Modal>
                </PageRow>
                <PageRow>
                    <Heading>Card details</Heading>
                    <CreditCardForm />
                </PageRow>
                <PageRow>
                    <Heading>Cancelation policy</Heading>
                    <p>
                        Cancellation policy Partial refund: Get back every night
                        that remains 24 hours after you cancel. No refund of
                        nights you spent or the service fee.
                    </p>
                </PageRow>
                <Button size="large" onClick={updateBooking}>
                    Request to book
                </Button>
            </DetailsContainer>

            <OverviewContainer>
                <OverviewModal>
                    <div className="accommodation">
                        <div className="image">
                            <img src={images[0].image} alt="" />
                        </div>

                        <div className="details">
                            <div>
                                <div className="rooms">Two bedrooms</div>
                                <div className="title">{title}</div>
                            </div>

                            <div className="reviews">
                                <div className="logo">
                                    <HiStar />
                                </div>
                                <div className="review">{avgReviews}</div>
                                <div className="count">
                                    ({reviews.length} reviews)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-details">
                        <div className="header">Price details</div>

                        <div className="row">
                            <div>
                                {formatCurrency(regularPrice)} &times;
                                {nrNights} nights &times; {nrGuests} guests
                            </div>
                            <div>
                                {formatCurrency(
                                    regularPrice * nrNights * nrGuests
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <u>Website fee</u>{" "}
                            </div>
                            <div>{formatCurrency(serviceFee)}</div>
                        </div>
                    </div>

                    <div className="total">
                        <div>Total (USD)</div>
                        <div>
                            {formatCurrency(
                                serviceFee + regularPrice * nrNights * nrGuests
                            )}
                        </div>
                    </div>
                </OverviewModal>
            </OverviewContainer>
        </Container>
    );
}
