import dayjs from "dayjs";
import { styled } from "styled-components";
import CustomDatePicker from "../../ui/CustomDatePicker";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    /* min-width: 400px; */
    justify-content: space-evenly;
    /* max-width: 100%; */
    width: 300px;
    max-width: 100%;
`;

export default function DateInterval({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) {

    const [searchParams,setSearchParams] = useSearchParams()

    
    return (
        <Container>
            <CustomDatePicker
              
                label="Start date"
                defaultValue={dayjs(startDate)}
                maxDate={dayjs(endDate).subtract(1, "day")}
                onChange={(newValue) => {
                    setStartDate(newValue);
                }}
                disablePast
                // maxDate={endDate.subtract(1, "day")}
            />
            <span>&mdash;</span>
            <CustomDatePicker
                label="End date"
                defaultValue={dayjs(endDate)}
                onChange={(newValue) => setEndDate(newValue)}
                // minDate={startDate.add(1, "day")}
                minDate={dayjs(startDate).add(1, "day")}
            />
        </Container>
    );
}
