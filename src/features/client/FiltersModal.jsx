import styled from "styled-components";
import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import { useState } from "react";

import { BsBuilding, BsBuildings } from "react-icons/bs";
import { LuHome } from "react-icons/lu";
import useFacilities from "../cabins/useFacilities";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { grey } from "@mui/material/colors";
import useQueryParams from "../../hooks/useQueryParams";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFilterQuery from "../../hooks/useFilterQuery";

const Container = styled.div`
    width: 400px;
    max-width: 100%;
    /* max-height: 500px; */
    z-index: 300;

    display: flex;
    flex-direction: column;
    /* padding-bottom: 2px; */
    /* background-color: red; */
`;

const Body = styled.div`
    /* max-height: 350px; */
    overflow-y: auto;
    padding: 25px 0;
    flex: 1;
    overflow: hidden;
    /* max-height: 200px; */
    max-height: calc(100vh - 300px);
    padding-left: 30px;
    padding-right: 30px;
    overflow-y: auto;
    margin-left: -20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
        width: 5px; /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
        background: #efefef; /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #5e5e5e; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
        /* border: 3px solid orange; creates padding around scroll thumb */
    }
`;

const Header = styled.div`
    font-size: 1.9rem;
    border-bottom: 1px solid gainsboro;
    font-weight: 400;
    text-align: center;
    padding-bottom: 10px;
    /* margin-bottom: 20px; */

    & h3 {
        font-weight: 500;
        font-size: 2.175rem;
    }
`;

const FilterRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 20px;

    & h3 {
        font-size: 1.875rem;
        font-weight: 500;
        color: #5c5c5c;
        padding-bottom: 5px;
    }
`;

const RangeLabels = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
`;
const Label = styled.div`
    border: 1px solid gainsboro;
    padding: 5px 15px;
    border-radius: 5px;
    flex: 1;

    &:focus-within {
        outline: 1px solid blue;
    }

    & .value-container {
        display: flex;
        align-items: center;
    }

    & .description {
        font-size: 1.2rem;
    }

    & .currency {
        font-weight: 500;
        font-size: 1.7rem;

        padding-right: 5px;
    }

    & .max-value.over::after {
        content: "+";
    }

    & input {
        border: none;
        width: 100%;
    }
    & input:focus {
        outline: none;
    }
`;

const NrGuests = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;

    & .guest-item {
        flex: 1;
        padding: 3px 10px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: none;
        border: 1px solid gainsboro;
    }

    & .guest-item.active {
        background-color: #424242;
        color: #fff;
    }

    & .guest-item:hover {
        outline: 1px solid black;
    }
`;

const Properties = styled.div`
    display: flex;
    gap: 15px;
    padding: 2px;

    & .property {
        flex: 1;
        outline: 1px solid gainsboro;
        padding: 15px;
        border-radius: 10px;
        cursor: pointer;

        transition: 0.05s ease-in all;
    }

    & .property.active {
        outline: 2px solid black;
    }

    & .property svg {
        width: 25px;
        height: 25px;
    }

    & .property:not(.active):hover {
        outline: 1px solid black;
    }

    & .property:active {
        scale: 0.95;
    }

    & .property .name {
        user-select: none;
        pointer-events: none;
    }
`;

const FacilityItem = styled.p`
    font-size: 1.5rem;
    color: #666;
    user-select: none;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid gainsboro;
    padding-top: 20px;
`;

const maxPrice = 800;

export default function FiltersModal({ onCloseModal }) {
    const {
        range: rangeQuery,
        guests: guestsQuery,
        property: propertyQuery,
    } = useFilterQuery(false, maxPrice, "range", "guests", "property");

    const [range, setRange] = useState(() => {
        return rangeQuery || [0, maxPrice];
    });

    const [guests, setGuests] = useState(() => {
        return guestsQuery ? Number(guestsQuery) : "";
    });

    const [property, setProperty] = useState(() => {
        return propertyQuery || "";
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const minDistance = 50;

    const minValue = range[0] == 0 ? 0 : range[0].toString();
    const maxValue = range[1] == 0 ? 0 : range[1].toString();

    const navigate = useNavigate();

    function handleChange(event, newValue, activeThumb) {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxPrice - minDistance);
                setRange([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setRange([clamped - minDistance, clamped]);
            }
        } else {
            setRange(newValue);
        }
    }

    function handleInputChange(e) {
        const rangeIndex = e.target.id === "min" ? 0 : 1;
        let value = Number(e.target.value);
        value = isNaN(value) || value < 0 ? 0 : value;

        setRange((prevRange) => {
            return prevRange.map((val, index) => {
                return index === rangeIndex ? value : val;
            });
        });
    }

    // function handleFacilities(e) {
    //     const checked = e.target.checked;
    //     const value = Number(e.target.value);
    //     console.log(value);

    //     if (checked) {
    //         setCheckedFacilities((prev) => {
    //             return [...prev, value];
    //         });
    //         return;
    //     }

    //     setCheckedFacilities((prevFacilitites) =>
    //         prevFacilitites.filter((facility) => facility !== value)
    //     );
    // }

    function onGuestChange(e) {
        const value = Number(e.target.dataset.guest);

        if (value === guests) {
            setGuests(0);
            return;
        }
        setGuests(value);
    }

    function onChangeProperty(e) {
        const newProperty = e.target.dataset.property;
        const isActive = e.target.className.includes("active");

        if (isActive) {
            setProperty("");
            return;
        }

        setProperty(newProperty);
    }

    function handleFilter() {
        const queryRange =
            range[1] >= maxPrice ? [range[0], 0].join(",") : range.join(",");

        if (!(range[0] === 0 && (range[1] === 0 || range[1] >= maxPrice))) {
            searchParams.set("range", queryRange);
        } else {
            searchParams.delete("range");
        }

        if (guests) {
            searchParams.set("guests", guests);
        } else {
            searchParams.delete("guests");
        }

        if (property) {
            searchParams.set("property", property);
        } else {
            searchParams.delete("property");
        }

        navigate({
            pathname: "/client",
            search: searchParams.toString(),
        });

        // navigate("/client");
        // setSearchParams(searchParams);
        onCloseModal?.();
    }

    function clearFilter() {
        setRange([0, maxPrice]);
        setGuests("");
        setProperty("");
    }

    // if (isLoading) return <Spinner />;

    return (
        <Container>
            <Header>
                <h3>Filters</h3>
            </Header>

            <Body>
                <FilterRow>
                    <h3>Price range</h3>

                    <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={range}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        max={maxPrice}
                        min={0}
                        sx={{
                            margin: "5px 0 10px 0",
                            color: "#565656",
                            "& .MuiSlider-thumb": {
                                width: 15,
                                height: 15,
                                color: "#3a3a3a",
                            },
                            "& .MuiSlider-rail": {
                                opacity: 0.5,
                                backgroundColor: "#bfbfbf",
                            },
                        }}
                        // getAriaValueText={"value"}
                    />

                    <RangeLabels>
                        <Label>
                            <label htmlFor="min">
                                <div className="description">Minumum</div>
                                <div className="value-container">
                                    <div className="currency">$</div>
                                    <div className="value">
                                        {/* <input
                                            id="min"
                                            value={minValue}
                                            type="number"
                                            onChange={handleInputChange}
                                        /> */}

                                        {minValue}
                                    </div>
                                </div>
                            </label>
                        </Label>
                        -
                        <Label>
                            <label htmlFor="max">
                                <div className="description">Maximum</div>
                                <div className="value-container">
                                    <div className="currency">$</div>
                                    {/* <input
                                        className="max-value"
                                        id="max"
                                        type="number"
                                        onChange={handleInputChange}
                                        value={maxValue}
                                    /> */}
                                    <div
                                        className={`value max-value ${
                                            maxValue >= maxPrice ? "over" : ""
                                        }`}
                                    >
                                        {maxValue}
                                    </div>
                                </div>
                            </label>
                        </Label>
                    </RangeLabels>
                </FilterRow>
                <FilterRow>
                    <h3>Number of guests</h3>
                    <NrGuests>
                        {Array.from({ length: 7 }, (e, i) => i).map((el) => {
                            return (
                                <div
                                    className={`guest-item ${
                                        guests === el + 1 ? "active" : ""
                                    }`}
                                    data-guest={el + 1}
                                    key={el}
                                    onClick={onGuestChange}
                                >
                                    {el + 1}
                                </div>
                            );
                        })}
                    </NrGuests>
                </FilterRow>
                <FilterRow>
                    <h3>Propery type</h3>

                    <Properties>
                        <div
                            className={`property ${
                                property === "house" ? "active" : ""
                            }`}
                            data-property="house"
                            onClick={onChangeProperty}
                        >
                            <LuHome />
                            <div className="name">House</div>
                        </div>
                        <div
                            className={`property ${
                                property === "apartament" ? "active" : ""
                            }`}
                            data-property="apartament"
                            onClick={onChangeProperty}
                        >
                            <BsBuilding />
                            <div className="name">Apartament</div>
                        </div>
                        <div
                            className={`property ${
                                property === "hotel" ? "active" : ""
                            }`}
                            data-property="hotel"
                            onClick={onChangeProperty}
                        >
                            <BsBuildings />
                            <div className="name">Hotel</div>
                        </div>
                    </Properties>
                </FilterRow>
                {/* <FilterRow>
                    <h3>Facilities</h3>

                    <FormGroup
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                        }}
                    >
                        {facilities.map((facility) => {
                            return (
                                <FormControlLabel
                                    key={facility.id}
                                    control={
                                        <Checkbox
                                            onChange={handleFacilities}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 25,
                                                },
                                                color: grey[900],
                                                "&.Mui-checked": {
                                                    color: grey[800],
                                                },
                                            }}
                                            checked={checkedFacilities.includes(
                                                facility.id
                                            )}
                                        />
                                    }
                                    label={
                                        <FacilityItem>
                                            {facility.label}
                                        </FacilityItem>
                                    }
                                    value={facility.id}
                                    name={`facilities`}
                                />
                            );
                        })}
                    </FormGroup>
                </FilterRow> */}
            </Body>
            <Buttons>
                <Button
                    onClick={clearFilter}
                    $color="#fff"
                    variation="danger"
                    style={{ color: "#000", border: "1px solid #000" }}
                    $hover={{ color: "red", backgroundColor: "white" }}
                >
                    Clear all
                </Button>

                <Button $color="#2a2a2a" onClick={handleFilter}>
                    Search
                </Button>
            </Buttons>
        </Container>
    );
}
