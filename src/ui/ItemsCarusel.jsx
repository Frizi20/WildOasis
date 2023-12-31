import { useEffect, useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { styled } from "styled-components";

const CaruseContainer = styled.div`
    display: flex;
    align-items: center;
    /* width: 500px; */
    flex: 1;
    overflow: hidden;
    position: relative;

    /* box-shadow: inset 2px 2px black; */
`;

const ItemsContainer = styled.div`
    display: flex;
    flex: 1;
`;

const CaruselBtnContainer = styled.div`
    /* background-color: green; */
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 7px 0 8px 1px #fff, -7px 0 8px 1px #fff;
    z-index: 2;
    /* width: fit-content; */
    user-select: none;
    /* border-radius: 50%; */
`;

const BtnContainer = styled.div`
    aspect-ratio: 1/1;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #353535;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid #353535;
`;

const ListUl = styled.ul`
    transition: 0.3s all linear;
    flex: 1;
    display: flex;
    gap: 5px;
    position: absolute;
    transform: translateX(0);
    /* left: 0; */
`;

export default function ItemsCarusel({ children }) {
    const listDom = useRef();
    const caruseContainer = useRef();
    const isClicked = useRef(false);

    function move(direction) {
        if (isClicked.current) return;

        const dir = direction === "left" ? 1 : -1;

        const { width: containerWIdth, left } =
            caruseContainer.current.getBoundingClientRect();
        const { left: listLeft, width: listWidth } =
            listDom.current.getBoundingClientRect();

        const listEnding = listWidth + listLeft;
        const containerEnding = left + containerWIdth;
        const stopRight =
            listEnding - containerEnding < -50 && direction != "left";

        if ((left - listLeft <= 40 && direction == "left") || stopRight) {
            return;
        } else {
            const style = window.getComputedStyle(listDom.current).transform;
            const transformX = new WebKitCSSMatrix(style).m41;

            listDom.current.style.transform = `translateX( ${
                transformX + 200 * dir
            }px)`;
        }

        isClicked.current = true;

        setTimeout(() => {
            isClicked.current = false;
        }, 300);
    }

    return (
        <ItemsContainer>
            <CaruselBtnContainer>
                <BtnContainer
                    onClick={() => {
                        move("left");
                    }}
                >
                    <HiArrowLeft />
                </BtnContainer>
            </CaruselBtnContainer>

            <CaruseContainer ref={caruseContainer}>
                <ListUl ref={listDom}> {children} </ListUl>
            </CaruseContainer>

            <CaruselBtnContainer>
                <BtnContainer
                    onClick={() => {
                        move("right");
                    }}
                >
                    <HiArrowRight />
                </BtnContainer>
            </CaruselBtnContainer>
        </ItemsContainer>
    );
}
