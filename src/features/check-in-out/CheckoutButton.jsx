import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

function CheckoutButton({ bookingId }) {
    const { checkOut, isCheckinOut } = useCheckOut();

    return (
        <Button
            variation="primary"
            size="small"
            onClick={() => checkOut(bookingId)}
            disabled={isCheckinOut}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
