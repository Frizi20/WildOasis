import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineGlobeEuropeAfrica,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
    bookings,
    confirmedStays,
    numDays,
    cabinCount,
}) {
    //1
    const numberBookings = bookings.length;

    //2
    const sales = bookings.reduce((acc, curr) => {
        return acc + curr.totalPrice;
    }, 0);

    const checkIns = confirmedStays.length;

    const occupancyRate = confirmedStays.reduce(
        (acc, curr) => acc + curr.numNights,
        0
    ) / (numDays * cabinCount);


    return (
        <>
            <Stat
                title={"Bookings"}
                color={"blue"}
                icon={<HiOutlineBriefcase />}
                value={numberBookings}
            />
            <Stat
                title={"Sales"}
                color={"green"}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title={"Check ins"}
                color={"indigo"}
                icon={<HiOutlineCalendarDays />}
                value={checkIns}
            />
            <Stat
                title={"Occupancy rate"}
                color={"yellow"}
                icon={<HiOutlineChartBar />}
                value={`${Math.round(occupancyRate * 100)}%`}
            />
        </>
    );
}
