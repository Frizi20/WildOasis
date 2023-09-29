import styled from "styled-components";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import ReservationModal from "./ReservationModal";
import DateInterval from "./DateInterval";
import Counters from "./Counters";
import useQueryParams from "../../hooks/useQueryParams";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

const StyledMakeReservationMobile = styled.div`
    width: 100%;
    /* background-color: red; */
    height: 100%;
    display: flex;

    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 1.2rem;
`;

const BookingDetails = styled.div`
    display: flex;
    /* align-items: center; */
    /* gap: 20px; */
    flex-direction: column;

    & .price {
        font-size: 1.5rem;
    }

    & .price b {
        font-weight: 600;
        font-size: 1.7rem;
    }

    & .interval,
    & .guests {
        cursor: pointer;
    }
`;

export default function MakeReservationMobile({
    accommodation,
    settings,
    cabinId,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { startDate: queryStartDate, queryEndDate } = useQueryParams(
        "startDate",
        "endDate"
    );

    const [startDate, setStartDate] = useState(() =>
        queryStartDate ? dayjs(queryStartDate) : dayjs(new Date())
    );

    const [endDate, setEndDate] = useState(() =>
        queryEndDate ? dayjs(queryEndDate) : dayjs(new Date()).add(1, "day")
    );

    const [nrGuests, setNrGuests] = useState();

    const { regularPrice } = accommodation;

    function handleGuestsChange(guests) {
        setNrGuests(guests);
    }

    function navigateToBook() {
        // const queryString = new URLSearchParams(
        //     Object.fromEntries([...getSearchParams])
        // ).toString();
        // console.log(queryString);
        navigate(`/client/book/${cabinId}?${searchParams}`, {
            preventScrollReset: true,
        });
    }

    useEffect(() => {
        searchParams.set("startDate", dayjs(startDate).format());
        searchParams.set("endDate", dayjs(endDate).format());

        setSearchParams(searchParams, { replace: true });
    }, [startDate, endDate, searchParams, setSearchParams]);

    return (
        <StyledMakeReservationMobile>
            <Modal>
                <Counters
                    opened={true}
                    isInModal={true}
                    onChange={handleGuestsChange}
                >
                    <BookingDetails>
                        <Row>
                            <Modal.Open opens={"interval"}>
                                <div className="interval">
                                    <u>
                                        {startDate.format("DD MMM")} -{" "}
                                        {endDate.format("DD MMM")}
                                    </u>
                                </div>
                            </Modal.Open>
                            <Modal.Open opens={"guests"}>
                                <div className="guests">
                                    <u>{nrGuests} guests</u>
                                </div>
                            </Modal.Open>
                        </Row>
                        <div className="price">
                            <b> {formatCurrency(regularPrice)} </b> night
                        </div>
                    </BookingDetails>

                    <Modal.Window name="interval" closeOutisde={false}>
                        <DateInterval
                            startDate={startDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            setStartDate={setStartDate}
                        />
                    </Modal.Window>
                    <Modal.Window name="guests">
                        <Counters.GuestsForm />
                    </Modal.Window>
                </Counters>
            </Modal>
            <Button onClick={navigateToBook}>Make reservation</Button>
        </StyledMakeReservationMobile>
    );
}
