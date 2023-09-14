import { useState } from "react";
import { styled } from "styled-components";
import Button from "../../ui/Button";
import useCreateReview from "./useCreateReview";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";
import { StarRating } from "../../ui/StarRating";

const FormContainer = styled.div`
    /* border: 1px solid gainsboro; */
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
    max-width: 100%;
    gap: 15px;

    & select {
        width: 100%;
    }

    & textarea {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        outline: 1px solid gainsboro;
        border: none;
    }
`;

export default function AddReview({ onCloseModal }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");

    const { createReview, isCreating } = useCreateReview();
    const { user, isLoading } = useUser();

    if (isLoading) return null;

    function submitReview() {
        if (!comment || !rating) return;

        createReview({
            comment,
            rating,
            userId: user.id,
        });

        onCloseModal?.();
    }

    function onRatingChange(rating) {
        setRating(rating);
    }

    return (
        <FormContainer>
            <StarRating
                updateRating={true}
                size={40}
                onStarRatingChange={onRatingChange}
            />

            <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                placeholder="Comment..."
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />

            <Button onClick={submitReview}>Review</Button>
        </FormContainer>
    );
}
