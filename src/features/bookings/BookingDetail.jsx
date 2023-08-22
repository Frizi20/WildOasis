import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { deleteBooking, isDeleting } = useDeleteBooking();
    const { isLoading, booking } = useBooking();
    const { checkOut, isCheckingOut } = useCheckOut();
    const navigate = useNavigate();
    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;

    // console.log(booking);
    if(!booking) return <Empty resourceName='booking' />

    const { status, id: bookingId } = booking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name={"delete"}>
                        <ConfirmDelete
                            disabled={isDeleting}
                            onConfirm={() => {
                                deleteBooking(bookingId, {
                                    onSettled: () => {
                                        navigate(-1);
                                    },
                                });
                            }}
                            resourceName={"bookings"}
                        />
                    </Modal.Window>
                </Modal>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
                {status === "unconfirmed" && (
                    <Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => {
                            navigate(`/checkin/${bookingId}`);
                        }}
                    >
                        Check in
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        disabled={isCheckingOut}
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => {
                            checkOut(bookingId);
                        }}
                    >
                        Check out
                    </Button>
                )}
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
