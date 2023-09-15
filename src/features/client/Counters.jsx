import { createContext, useReducer, useState } from "react";
import styled, { css } from "styled-components";
import { useContext } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { HiSelector } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useIsMount } from "../../hooks/isMount";

const Container = styled.div`
    min-width: 300px;
    position: absolute;
    background-color: #fff;
    width: calc(100% + 4px);
    border: 1px solid gainsboro;
    left: -2px;
    border-radius: 5px;
    top: 100%;

    ${(props) =>
        props.$isInModal &&
        css`
            position: relative;
            border: none;
        `}

    & .actions {
        display: flex;
        justify-content: center;
        margin-top: 5px;
    }
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

    & .btn:hover {
        background-color: #f7f7f7;
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

// & .modal {
//     position: absolute;
//     background-color: #fff;
//     width: calc(100% + 5px);
//     left: -2.5px;
//     border: 1px solid #f3f3f3;
//     bottom: 1px;
//     height: fit-content;
//     transform: translateY(100%);
//     padding-bottom: 10px;
//     border-radius: 5px;
//     padding: 5px;
// }

const guestsState2 = {
    maxCapacity: 10,
    totalGuests: 1,
    options: [
        {
            id: 1,
            count: 1,
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
        if (state.totalGuests <= 1) return state;

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

    if (action.type === "SYNC_QUERY_PARAMS") {
        // console.log(action.payload);

        const queryData = action.payload;
        const currOptions = [...state.options];
        let totalGuests = 0;

        const newOptions = currOptions.map((option) => {
            const newOption = queryData.find(
                ([label]) => label == option.label.toLowerCase()
            );

            if (newOption) totalGuests += Number(newOption[1]);

            return newOption
                ? { ...option, count: Number(newOption[1]) }
                : option;
        });

        if (totalGuests > state.maxCapacity) {
            return state;
        }

        return { ...state, options: newOptions, totalGuests };
    }

    return state;
}

const GuestsContext = createContext();

function Counters({ children, opened = false, isInModal, onChange }) {
    const [state, dispatch] = useReducer(reducer, guestsState2);
    const [isOpened, setIsOpened] = useState(opened);
    const [searchParams, setSearchParams] = useSearchParams();

    const isMount = useIsMount();

    function getNrGuests() {
        // onChange('s')
    }

    useEffect(() => {
        // console.log(getNrGuests());
        console.log(state);
        onChange?.(state.totalGuests);
    }, [state]);

    useEffect(() => {
        dispatch({ type: "SYNC_QUERY_PARAMS", payload: [...searchParams] });
    }, []);

    useEffect(() => {
        if (!isMount) {
            state.options.forEach((option) => {
                if (option.count > 0) {
                    searchParams.set(option.label.toLowerCase(), option.count);
                } else {
                    if (searchParams.has(option.label.toLowerCase())) {
                        searchParams.delete(option.label.toLowerCase());
                    }
                }
            });
            setSearchParams(searchParams, { replace: true });
        }
    }, [state, setSearchParams, searchParams, isMount]);

    return (
        <GuestsContext.Provider
            value={{ isOpened, setIsOpened, state, dispatch, isInModal }}
        >
            {children}
        </GuestsContext.Provider>
    );
}

const Input = styled.div`
    /* min-height: 35px; */
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function Label() {
    const { state, setIsOpened, isInModal } = useContext(GuestsContext);

    const string = state.options
        .filter((option) => option.count > 0)
        .map((option) => {
            return `${option.count} ${option.label}`;
        })
        .join(", ");

    return (
        <Input
            onClick={() => {
                setIsOpened(true);
            }}
        >
            <span> {string} </span>
            {!isInModal && <HiSelector />}
        </Input>
    );
}

function GuestsForm() {
    const { state, dispatch, isOpened, setIsOpened, isInModal } =
        useContext(GuestsContext);

    const { modal } = useOutsideClick(() => {
        !isInModal && setIsOpened(false);
    });

    return (
        isOpened && (
            <Container ref={modal} $isInModal={isInModal}>
                {state.options.map((option, i) => {
                    return (
                        <Counter dispatch={dispatch} key={i} option={option} />
                    );
                })}
            </Container>
        )
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

Counters.GuestsForm = GuestsForm;
Counters.Label = Label;

export default Counters;
