import { styled } from "styled-components";
import { StarRating } from "../../ui/StarRating";
import { format } from "date-fns";

const StyledUserReview = styled.div`
    min-height: 200px;
    border: 1px solid gainsboro;
    padding: 15px;
    border-radius: 15px;

    & .header {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid gainsboro;
        margin-bottom: 10px;
    }

    & .avatar-container {
        /* aspect-ratio: 1/1;         */
        border-radius: 50%;
    }

    & .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: 1px solid gainsboro;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        overflow: hidden;
    }

    & .star-count {
        flex: 1;
        /* padding: 0 30px; */
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    & .user-details {
        display: flex;
        width: 100%;
    }

    & .left {
        /* width: 100%; */
        display: flex;
    }

    & .date-name {
        flex: 1;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    & .date {
        font-size: 1.3rem;
        color: #4d4d4d;
        letter-spacing: 1px;
    }

    & .comment {
        /* line-height: 24px; */
        font-size: 1.6rem;
        padding: 5px;
    }

    @media screen and (max-width: 533px) {
        & .stars svg {
            width: 17px;
            height: 17px;
        }

        & .date-name {
            padding: 0 10px;
        }
    }
`;

export function formatDate(date) {
    return format(new Date(date), "d MMM YYY");
}

export default function UserReview({ review }) {
    const {
        comment,
        rating,
        created_at: reviwDate,
        profile: { display_name: name, avatar },
    } = review;

    return (
        <StyledUserReview>
            <div className="header">
                <div className="user-details">
                    <div className="left">
                        <div className="avatar-container">
                            <div className="avatar">
                                <img
                                    src={avatar || "/default-user.jpg"}
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="date-name">
                            <div className="name">{name}</div>
                            <div className="date">{formatDate(reviwDate)}</div>
                        </div>
                    </div>
                    <div className="star-count">
                        <StarRating className="stars" rating={rating} />
                    </div>
                </div>
            </div>
            <div className="comment">{comment}</div>
        </StyledUserReview>
    );
}
