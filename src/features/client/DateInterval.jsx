import dayjs from "dayjs";
import { styled } from "styled-components";
import CustomDatePicker from "../../ui/CustomDatePicker";
import useQueryParams from "../../hooks/useQueryParams";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export default function DateInterval({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) {
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
