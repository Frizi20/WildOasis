import { css, styled } from "styled-components";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiLocationMarker, HiOutlineFilter } from "react-icons/hi";
import { useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import useSugestedCabins from "../../features/client/useSugestedCabins";
import SpinnerMini from "../SpinnerMini";

const StyledSearch = styled.div`
    display: flex;
    background-color: #ffffff;
    padding: 2px;
    border-radius: 50px;
    border: 1px solid gainsboro;
    position: relative;
    box-shadow: 0px 1px 0px 0px #dcdcdcb0;

    z-index: 5;

    ${(props) =>
        props.$isMobile &&
        css`
            width: 100%;
        `}
`;

const Right = styled.div`
    overflow: hidden;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #fff;
    padding-left: 10px;
`;

const Left = styled.div`
    overflow: hidden;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;

    ${(props) =>
        props.$isMobile &&
        css`
            width: 100%;
        `}
`;

const Input = styled.input`
    padding: 5px 15px;
    height: 100%;
    border: none;

    outline: 1px gray;

    position: relative;

    ${(props) =>
        props.border === "center" &&
        css`
            &::before {
                content: "";
                height: 90%;
                background-color: #b1b1b1;
                width: 1px;
                position: absolute;
                left: 0;
            }
            &::after {
                content: "";
                height: 90%;
                background-color: #b1b1b1;
                width: 1px;
                position: absolute;
                right: 0;
            }
        `}

    ${(props) =>
        props.radius === "left" &&
        css`
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            /* width: 140px; */
        `}

    ${(props) =>
        props.radius === "right" &&
        css`
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
        `}


    
    @media screen and (max-width: 700px) {
        ${(props) =>
            props.$hide === true &&
            css`
                display: none;
            `}
    }

    &:focus {
        outline: none;
    }

    &::placeholder {
        padding-left: 10px;
    }
`;

const StyledButton = styled.button`
    height: 100%;
    border: none;
    padding: 10px;
    background-color: var(--color-brand-600);
    color: #fff;
    border-radius: 50%;
    aspect-ratio: 1/1;
    margin-right: 5.7px;
`;

const SuggestionsContainer = styled.div`
    width: 100%;
    position: absolute;
    background-color: #ffffff;
    z-index: 200;
    border: 1px solid gainsboro;
    /* max-height: calc(50vh- 80px); */
    max-height: calc(100vh - 300px);
    /* min-height: 200px; */
    bottom: -10px;
    transform: translate(0, 100%);
    border-radius: 10px;
    min-height: 50px;
    padding: 10px;
    overflow-y: auto;

    & p {
        color: #868686;
        font-size: 1.3rem;
        padding-left: 10px;
        text-align: center;
    }
`;

const SearchBackround = styled.div`
    width: 100%;
    height: 100%;
    background-color: #00000012;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 4;
`;

const Suggestion = styled.div`
    padding: 10px 15px;
    /* border: 1px solid gainsboro; */
    /* min-height: 50px; */
    display: flex;
    justify-content: space-between;

    &:hover {
        background-color: #f7f7f7;
        cursor: pointer;
    }

    & svg {
        color: #b8b8b8;
        width: 23px;
        height: 23px;
    }
`;

export default function Search({ isMobile }) {
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchActive, setSearchActive] = useState(false);

    const navigate = useNavigate();

    const { isLoading, data: suggestions } = useSugestedCabins({
        search: search,
    });

    useEffect(() => {
        const searchQuery = searchParams.get("search");
        if (searchQuery) {
            setSearch(searchQuery);
        }
    }, [searchParams]);

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // searchParams.set("search", search);
        if (!search) {
            return navigate("/client");
        }
        // setSearchParams(searchParams);
        setSearchActive(false);
        navigate(`/client?search=${search}`);
    }

    return (
        <>
            <form
                style={isMobile ? { width:'calc(100% - 25px)' } : {}}
                action=""
                onSubmit={handleSubmit}
            >
                <StyledSearch $isMobile={isMobile}>
                    <Left $isMobile={isMobile}>
                        <Input
                            onFocus={() => {
                                setSearchActive(true);
                            }}
                            // onBlur={() => {
                            //     setSearchActive(false);
                            // }}
                            onChange={handleSearch}
                            value={search}
                            radius="left"
                            type="text"
                            name=""
                            id=""
                            placeholder="Search..."
                        />
                    </Left>
                    <Right>
                        <StyledButton>
                            <HiMagnifyingGlass />
                        </StyledButton>
                    </Right>
                    {searchActive && (
                        <SuggestionsContainer>
                            {isLoading && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <SpinnerMini />
                                </div>
                            )}
                            {/* <p>Suggestion</p> */}
                            {/* {!isLoading &&
                                suggestions.map((sugestion) => {
                                    <div className="suggestion">
                                        {sugestion.location}
                                    </div>;
                                })} */}

                            {!isLoading && suggestions.length === 0 && (
                                <p>No suggestions...</p>
                            )}

                            {!isLoading &&
                                suggestions.length > 0 &&
                                suggestions.map((suggestion) => {
                                    return (
                                        <Suggestion
                                            key={suggestion.id}
                                            onClick={(e) => {
                                                navigate(
                                                    `/client?search=${suggestion.location}`
                                                );

                                                setSearchActive(false);
                                            }}
                                        >
                                            <div>{suggestion.location}</div>
                                            <HiLocationMarker />
                                        </Suggestion>
                                    );
                                })}

                            {/* <Suggestion>Constanta,Constanta</Suggestion> */}
                        </SuggestionsContainer>
                    )}
                </StyledSearch>

                {searchActive && (
                    <SearchBackround
                        onClick={() => {
                            console.log("clickk");
                            setSearchActive(false);
                        }}
                    />
                )}
            </form>
        </>
    );
}
