import { styled } from "styled-components";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import CustomDatePicker from "../../ui/CustomDatePicker";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import { formatCurrency } from "../../utils/helpers";
import Counters from "./Counters";

const ReserveModalContainer = styled.div`
    background-color: #ffffff;
    flex: 0 0 37%;
    position: relative;
    padding: 15px 0 15px 40px;

    & .reservation-modal {
        position: sticky;
        top: 70px;
        border-radius: 20px;
        /* height: 400px; */
        border: 1px solid gainsboro;
        padding: 30px 20px;
        gap: 10px;
        display: flex;
        flex-direction: column;
    }

    & .header {
        padding-bottom: 10px;
        /* font-size: 1.7rem; */
        font-weight: 400;
    }

    & .header span {
        font-size: 2.5rem;
        font-weight: 500333;
    }

    & .form {
        display: grid;
        gap: 15px;
        grid-template-columns: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
    }

    & .nr-people {
        grid-area: 2/1/2/3;
        /* padding: 10px; */
        /* border: 1px solid gainsboro; */
        border-radius: 5px;
    }

    & .form > div {
        /* color: var(--color-grey-400); */
    }

    & .total-price {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    & .total-price .label {
        font-size: 1.6rem;
        font-weight: 500;
        flex: 1;

        color: var(--color-grey-600);
    }
    & .total-price .value {
        flex: 1;
        text-align: right;
        color: var(--color-grey-600);
    }

    & .total-price .value strong {
        font-weight: 500;
        font-size: 1.6rem;
    }

    & .datePicker input {
        border: none;
        width: 100%;
    }

    & .datePicker input:focus {
        outline: none;
    }

    & .from-date {
    }

    & .price-details .row {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
        font-size: 1.4rem;
    }

    @media screen and (max-width: 982px) {
        display: none;
    }
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GuestsInput = styled.div`
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 10px;
    color: #3f3f3f;
    cursor: pointer;
    position: relative;

    & .modal {
        position: absolute;
        background-color: #fff;
        width: calc(100% + 5px);
        left: -2.5px;
        border: 1px solid #f3f3f3;
        bottom: 1px;
        height: fit-content;
        transform: translateY(100%);
        padding-bottom: 10px;
        border-radius: 5px;
        padding: 5px;
    }
`;

export default function ReservationModal({ accommodation, settings }) {
    const navigate = useNavigate();

    const queryParams = useQueryParams("startDate", "endDate");
    const { startDate: queryStartDate, endDate: queryEndDate } = queryParams;

    const [startDate, setStartDate] = useState(() =>
        queryStartDate ? dayjs(queryStartDate) : dayjs(new Date())
    );
    const [endDate, setEndDate] = useState(() =>
        queryEndDate ? dayjs(queryEndDate) : dayjs(new Date()).add(1, "day")
    );

    const [nrGuests, setNrGuests] = useState(0);

    const [getSearchParams, setSearchParams] = useSearchParams();

    const nrNights = endDate.diff(startDate, "day");
    const { regularPrice } = accommodation;

    const { id: cabinId } = useParams();

    useEffect(() => {
        getSearchParams.set("startDate", startDate.format());
        getSearchParams.set("endDate", endDate.format());

        setSearchParams(getSearchParams, { replace: true });
    }, [startDate, endDate, setSearchParams, getSearchParams]);

    function navigateToBook() {
        // const queryString = new URLSearchParams(
        //     Object.fromEntries([...getSearchParams])
        // ).toString();
        // console.log(queryString);
        navigate(`/client/book/${cabinId}?${getSearchParams}`);
    }

    function handleGuestsChange(guests) {
        setNrGuests(guests);
    }

    return (
        <ReserveModalContainer>
            <div className="reservation-modal">
                <div className="header">
                    <div>
                        <span>{formatCurrency(regularPrice)}$</span> night
                    </div>
                </div>
                <div className="form">
                    {/* <div className="date-interval"> */}
                    <div className="from-date">
                        <CustomDatePicker
                            label="Start date"
                            defaultValue={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            disablePast
                            maxDate={endDate.subtract(1, "day")}
                        />
                    </div>
                    <div className="to-date">
                        <CustomDatePicker
                            label="End date"
                            defaultValue={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            disablePast
                            minDate={startDate.add(1, "day")}
                        />
                    </div>
                    <div className="nr-people">
                        <GuestsInput>
                            <Counters onChange={handleGuestsChange}>
                                <Counters.Label />
                                <Counters.GuestsForm />
                            </Counters>
                        </GuestsInput>
                    </div>
                </div>

                <div className="price-details">
                    <div className="row">
                        <div>
                            <span>{formatCurrency(regularPrice)} </span>
                            <span> &times; </span>
                            <span> {nrNights} </span>
                            {nrNights > 1 ? "nights" : "night"}
                            <span> &times; </span>
                            <span> {nrGuests} </span>
                            <span> {nrGuests > 1 ? "guests" : "guest"} </span>
                        </div>
                        <div>
                            {formatCurrency(regularPrice * nrNights * nrGuests)}
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <u>Webiste fee</u>
                        </div>
                        <div>{formatCurrency(settings?.serviceFee)}</div>
                    </div>
                </div>

                <div className="total-price">
                    <div className="label">Total price:</div>
                    <div className="value">
                        <strong>
                            {formatCurrency(
                                nrNights * regularPrice * nrGuests +
                                    settings?.serviceFee
                            )}
                        </strong>
                    </div>
                </div>

                <Center>
                    <Button onClick={navigateToBook}>Make reservation</Button>
                </Center>
            </div>
        </ReserveModalContainer>
    );
}
