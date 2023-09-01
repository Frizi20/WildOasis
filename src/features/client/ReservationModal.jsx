import { styled } from "styled-components";
import Button from "../../ui/Button";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const ReserveModalContainer = styled.div`
    background-color: #ffffff;
    flex: 0 0 33%;
    position: relative;
    padding: 15px 0 15px 50px;

    & .reservation-modal {
        position: sticky;
        top: 70px;
        border-radius: 20px;
        /* height: 400px; */
        border: 1px solid gainsboro;
        padding: 30px 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
    }

    & .price-per-night {
        text-align: center;
        font-size: 1.7rem;
        font-weight: 500;
    }

    & .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
    }

    & .nr-people {
        grid-area: 2/1/2/3;
    }

    & .form > div {
        border: 1px solid gainsboro;
        padding: 10px;

        color: var(--color-grey-400);
    }

    & .total-price {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    & .total-price .label {
        font-size: 1.8rem;
        flex: 1;

        color: var(--color-grey-600);
    }
    & .total-price .value {
        flex: 1;
        text-align: center;
        color: var(--color-grey-600);
    }

    & .total-price .value strong {
        font-weight: 500;
        font-size: 1.8rem;
    }

    & .datePicker input {
        border: none;
        width: 100%;
    }

    & .datePicker input:focus {
        outline: none;
    }

    @media screen and (max-width: 982px){
        display: none;
    }
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ReservationModal({ accommodation }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { regularPrice } = accommodation;

    return (
        <ReserveModalContainer>
            <div className="reservation-modal">
                <div className="price-per-night">
                    {regularPrice} lei / night
                </div>
                <div className="form">
                    {/* <div className="date-interval"> */}
                    <div className="from-date">
                        <DatePicker
                            wrapperClassName="datePicker"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div className="to-date">
                        <DatePicker
                            wrapperClassName="datePicker"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </div>
                    <div className="nr-people">3 adults, 1 child, 2 pets</div>
                </div>

                <div className="total-price">
                    <div className="label">Total price:</div>
                    <div className="value">
                        <strong>2500 lei</strong>{" "}
                    </div>
                </div>

                <Center>
                    <Button>Make reservation</Button>
                </Center>
            </div>
        </ReserveModalContainer>
    );
}
