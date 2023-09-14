import { css, styled } from "styled-components";

const GalleryContainer = styled.div`
    /* height: 500px; */
    /* border: 1px solid gainsboro; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: minmax(100px, 200px) minmax(100px, 200px);
    gap: 10px;
    margin-top: 10px;

    ${(props) =>
        props.$nrImages === 3 &&
        css`
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: minmax(100px, 260px) minmax(100px, 260px);

            & div:nth-child(1) {
                grid-area: 1/1/3/3;
            }
        `}

    ${(props) =>
        props.$nrImages === 1 &&
        css`
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;

            & div:nth-child(1) {
                grid-area: 1/1/3/3;
                max-height: 450px;

            }

            & img {
                object-position: bot;
            }
        `}

    ${(props) =>
        props.$nrImages === 2 &&
        css`
            & div:nth-child(1) {
                grid-area: 1/1/3/3;
            }
            & div:nth-child(2) {
                grid-area: 1/3/3/5;
            }
        `}

    ${(props) =>
        props.$nrImages === 4 &&
        css`
            grid-template-columns: 1fr 1fr;
            grid-template-rows: minmax(100px, 260px) minmax(100px, 260px);

            & div:nth-child(1) {
                /* grid-area: 1/1/3/2; */
            }
            & div:nth-child(2) {
                /* grid-area: 1/3/3/5; */
            }
        `}

    ${(props) =>
        props.$nrImages === 5 &&
        css`
            & div:first-child {
                grid-area: 1/1/3/3;
            }
        `}

    & div {
        border: 1px solid gainsboro;
        position: relative;
    }

    & img {
        /* width: 20px; */
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    @media screen and (max-width: 1090px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        max-height: 450px;

        & div:not(:first-child) {
            display: none;
        }
        & div:first-child {
            grid-area: 1/1/4/5;
        }
    }
`;

export default function GaleryDesktop({ images }) {
    const nrImages = images.length;
    return (
        <GalleryContainer $nrImages={nrImages}>
            {images.map((image) => {
                return (
                    <div key={image.id}>
                        <img src={image.image} alt="" />
                    </div>
                );
            })}
        </GalleryContainer>
    );
}
