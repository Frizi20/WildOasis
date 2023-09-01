import { useState } from "react";
import { styled } from "styled-components";
import Button from "../../ui/Button";
import useCreateReview from "./useCreateReview";
import { useUser } from "../authentication/useUser";
import { useParams } from "react-router-dom";

const FormContainer = styled.div`
    border: 1px solid gainsboro;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;

    gap: 10px;

    & select {
        width: 100%;
    }

    & textarea {
        width: 100%;
    }
`;

export default function AddReview() {
    const [comment, setComment] = useState("zxczx");
    const [rating, setRating] = useState(5);

    const { createReview, isCreating } = useCreateReview();
    const { user, isLoading } = useUser();

    if (isLoading) return null;

    function submitReview() {
        createReview({
            comment,
            rating,
            userId: user.id,
        });
    }

    return (
        <FormContainer>
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
            <select
                name=""
                id=""
                value={rating}
                onChange={(e) => {
                    setRating(e.target.value);
                }}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <Button onClick={submitReview}>Review</Button>
        </FormContainer>
    );
}
