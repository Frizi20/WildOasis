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

const reviews = [
    {
        comment:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, deleniti magnam quasi nam quis provident voluptatum eum, libero commodi, odit dolore repellat exercitationem maxime accusantium!',
        avatar:'AB',
        name:'Schultz Mavis',
        rating:4
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, omnis.',
        avatar:'CM',
        name:'Reichert Alison',
        rating:5
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus at eius similique? Eum, ad laudantium?',
        avatar:'AM',
        name:'Ewell Mueller',
        rating:3.5
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos maxime perspiciatis laborum odit alias dolorum, impedit, perferendis exercitationem cumque sed adipisci nostrum quam! Nemo, illum? Perspiciatis assumenda pariatur repellat quidem quos, nulla possimus? Temporibus consectetur, earum laudantium tenetur rem atque!',
        avatar:'SC',
        name:'Abbott Oleta',
        rating:2
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos maxime perspiciatis laborum odit alias dolorum, impedit, perferendis exercitationem cumque sed adipisci nostrum quam! Nemo!',
        avatar:'DA',
        name:'Corkery Demetrius',
        rating:4.5
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, omnis.',
        avatar:'VS',
        name:'Weber Tressa',
        rating:3
    },
    {
        comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, omnis.',
        avatar:'CM',
        name:'Renner Lenna',
        rating:3.5
    },
]

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
