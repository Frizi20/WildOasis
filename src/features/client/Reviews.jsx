import { HiStar } from "react-icons/hi2";
import { styled } from "styled-components";

const ReviewsContainer = styled.div`
    height: 200px;
    border: 1px solid gainsboro;
`;

export default function Reviews() {
    return <ReviewsContainer>
        <h4>
            <HiStar/> 4.80 out of 203 reviews
        </h4>
    </ReviewsContainer>;
}
