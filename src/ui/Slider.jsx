import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { styled } from "styled-components";

const SliderContainer = styled.div`
    height: 100%;
    width: 100%;
    aspect-ratio: 16/9;
    position: relative;
    overflow: hidden;
`;

const ItemsTrack = styled.div`
    height: 100%;
    position: relative;

    & img {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: 0.3s ease-out all;
        object-fit: cover;
        user-select: none;
    }
`;

const Arrow = styled.div`
    border-radius: 50%;
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    width: 35px;
    height: 35px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 2;
    cursor: pointer;
    & svg {
        width: 100%;
        height: 100%;
    }

    top: 50%;
`;

const ArrowLeft = styled(Arrow)`
    left: 5px;
`;

const ArrowRight = styled(Arrow)`
    right: 5px;
`;

const NavigationContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    /* width: 30%; */
    position: relative;

    display: flex;
    justify-content: center;
    gap: 10px;
`;

const NavigationDot = styled.div`
    width: 7px;
    height: 7px;
    background-color: #bfbfbf;
    border-radius: 50%;

    &.active {
        background-color: #fff;
    }
`;

export default function Slider({ isHovered, images }) {
    const [currItem, setCurrItem] = useState(0);
    const [key, setKey] = useState(0)
    const track = useRef();
    const nrImages = images.length;

    useEffect(() => {
        const images = Array.from(track.current.children);
        const { width } = track.current.getBoundingClientRect();

        images.forEach((image, index) => {
            image.style.left = (index - currItem) * width + "px";
            image.style.zIndex = index * -1;
        });
    }, [currItem,key]);

    // console.log('render');

    // useEffect(()=>{
    //     const resize = function(){
    //         setKey(Math.random())
    //     }

    //     window.addEventListener('resize', resize)

    //     return ()=>{
    //         window.removeEventListener('resize', resize)
    //     }
    // },[])
  
    const moveRight = function () {
        setCurrItem((prev) => prev + 1);
    };

    const moveLeft = function () {
        setCurrItem((prev) => prev - 1);
    };

    return (
        <SliderContainer >
            {isHovered && currItem > 0 && (
                <ArrowLeft
                    onClick={(e) => {
                        e.preventDefault();
                        moveLeft();
                    }}
                >
                    <HiArrowLeft />
                </ArrowLeft>
            )}

            <ItemsTrack ref={track}>
                {images.map((img) => {
                    return <img src={img?.image} alt="" key={img.id} />;
                })}
            </ItemsTrack>
            {isHovered && currItem + 1 < nrImages && (
                <ArrowRight
                    onClick={(e) => {
                        e.preventDefault();
                        moveRight();
                    }}
                >
                    <HiArrowRight />
                </ArrowRight>
            )}
            {isHovered && (
                <NavigationContainer>
                    {images.map((img, i) => {
                        return (
                            <NavigationDot
                                className={i == currItem && "active"}
                                key={img.id}
                            />
                        );
                    })}
                </NavigationContainer>
            )}
        </SliderContainer>
    );
}
