import { DatePicker } from "@mui/x-date-pickers";

const DatePickerStyle = {
    "& .MuiInputLabel-root.Mui-focused": { color: "#1e0078" },
    "& input": { fontSize: "1.3rem" },
    "& MuiButtonBase-root": { fontSize: "2rem" },
    "& label": {
        fontSize: "1.5rem",
        backgroundColor: "#fff",
        padding: "0 10px",
    },
};

export default function CustomDatePicker(props) {
    return (
        <DatePicker
            sx={DatePickerStyle}
            {...props}
            slotProps={{
                popper: {
                    sx: {
                        "& .MuiPickersDay-root": { fontSize: "1.2rem" },
                        "& .MuiDayCalendar-weekDayLabel": {
                            fontSize: "1.2rem",
                        },
                        "& .MuiPickersCalendarHeader-labelContainer": {
                            fontSize: "1.3rem",
                        },
                    },
                },
            }}
        />
    );
}
