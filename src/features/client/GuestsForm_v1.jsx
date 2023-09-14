import { createContext, useReducer, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";

const Container = styled.div`
    min-width: 300px;

    & .actions {
        display: flex;
        justify-content: center;
        margin-top: 5px;
    }
`;

const Header = styled.h2`
    font-weight: 500;
`;

const CounterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    & .counter {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    & .btn {
        padding: 7px;
        border: 1px solid gainsboro;
        border-radius: 50%;
        aspect-ratio: 1/1;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .count {
        font-size: 2rem;
        color: #999;
    }

    & .description div:first-child {
        font-size: 1.6rem;
        font-weight: 500;
        /* background-color: red; */
    }

    & .description div:nth-child(2) {
        font-size: 1.4rem;
        color: #999;
        /* font-weight: 500; */
        /* background-color: red; */
    }
`;

const guestsState2 = {
    maxCapacity: 10,
    totalGuests: 0,
    options: [
        {
            id: 1,
            count: 0,
            label: "Adults",
            labelSingular: "Adult",
            details: "Age 13+",
        },
        {
            id: 2,
            count: 0,
            label: "Children",
            labelSingular: "Child",
            details: "Age 13+",
        },
        {
            id: 3,
            count: 0,
            label: "Infants",
            labelSingular: "Infant",
            details: "Under 2",
        },
        {
            id: 4,
            count: 0,
            labelSingular: "Pet",
            label: "Pets",
            details: "",
        },
    ],
};

function reducer(state, action) {
    if (action.type === "increment") {
        if (state.totalGuests + 1 > state.maxCapacity) return state;
        // console.log(state);
        const newOptions = state.options.map((option) => {
            return option.id === action.payload
                ? {
                      ...option,
                      count: option.count + 1,
                  }
                : option;
        });

        return {
            ...state,
            options: newOptions,
            totalGuests: state.totalGuests + 1,
        };
    }

    if (action.type === "decrement") {
        let hasDecreased = false;

        const newOptions = state.options.map((option) => {
            // console.log(option.id === action.payload);
            if (option.id === action.payload) {
                const canDecrese = !(option.count - 1 < 0);
                hasDecreased = hasDecreased || canDecrese;
                return {
                    ...option,
                    count: canDecrese ? option.count - 1 : 0,
                };
            } else {
                return option;
            }
        });

        const totalGuests = hasDecreased
            ? state.totalGuests - 1
            : state.totalGuests;

        return { ...state, options: newOptions, totalGuests };
    }

    return state;
}

// const initialState =

const GuestsContext = createContext()



export default function GuestsForm({ onCloseModal, guestsState = guestsState2, setGuests }) {
    const [state, dispatch] = useReducer(reducer, guestsState);
    
    return (
        
        <Container>
            {/* <Header>Guests</Header> */}
            {state.options.map((option, i) => {
                return <Counter dispatch={dispatch} key={i} option={option} />;
            })}
            <div className="actions">
                {/* <Button size="medium" variation="danger">Close</Button> */}
                <Button
                    onClick={() => {
                        setGuests(state);
                        onCloseModal();
                    }}
                    size="medium"
                >
                    Save
                </Button>
            </div>
        </Container>
    );
}

function Counter({ option, dispatch }) {
    return (
        <CounterContainer>
            <div className="description">
                <div>{option.label}</div>
                <div>{option.details}</div>
            </div>

            <div className="counter">
                <div
                    className="left btn"
                    onClick={() => {
                        dispatch({ type: "decrement", payload: option.id });
                    }}
                >
                    -
                </div>
                <div className="count"> {option.count} </div>
                <div
                    className="right btn"
                    onClick={() => {
                        dispatch({ type: "increment", payload: option.id });
                    }}
                >
                    +
                </div>
            </div>
        </CounterContainer>
    );
}
