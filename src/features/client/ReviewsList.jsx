import { styled } from "styled-components";
import UserReview from "./UserReview";

const ReviewsListContainer = styled.div`
    margin-top: 25px;
`;

const Reviews = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 940px){
        grid-template-columns: 1fr;
    }
`;


export default function ReviewsList({reviews}) {

    return (
        <ReviewsListContainer>
            <Reviews>
                {reviews.map(review=>{
                    return <UserReview key={review.id} review={review} />
                })}
            </Reviews>
        </ReviewsListContainer>
    );
}
