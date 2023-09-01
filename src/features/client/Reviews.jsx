import { styled } from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import { StarRating } from "../../ui/StarRating";

const ReviewsContainer = styled.div`
    /* height: 200px; */
    border: 1px solid gainsboro;
    display: flex;
    /* align-items: center; */
    margin-top: 40px;
`;

const GradeContainer = styled.div`
    /* border: 1px solid gainsboro; */
    border-right: 1px solid gainsboro;
    flex: 0 0 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    & .reviews-count {
        font-size: 1.4rem;
        font-weight: 500;
        color: #838383;
        padding: 5px;
    }

    & .grade {
        font-size: 5rem;
        font-weight: 500;
    }
`;

const ReviewsProgressBars = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-evenly;
    gap: 5px;
    padding: 15px 0;
`;

const ProgressBarrRow = styled.div`
    display: flex;
    align-items: center;

    & .label {
        font-size: 1.3rem;
        flex: 0 0 35px;
        text-align: center;
        font-size: 1.2rem;
        color: #5a5a5a;
        font-weight: 600;
    }

    & .progress-bar-container {
        flex: 1;
        padding-right: 10px;
        /* padding: 10px; */
    }
`;

export default function Reviews({ reviews }) {
    const nrReviews = reviews.length;
    const grade =
        Math.round(
            reviews.reduce((acc, curr) => acc + curr.rating / nrReviews, 0) * 10
        ) / 10;
    const gradeDisplay = grade % 1 === 0 ? String(grade) + ".0" : grade;

    const separatedReviews = Object.entries(
        separateReviews(reviews, nrReviews)
    ).reverse();

    return (
        <ReviewsContainer>
            <GradeContainer>
                <div className="grade"> {gradeDisplay} </div>
                <div className="stars">
                    <StarRating size={23} color={"#004753"} rating={grade} />
                </div>
                <div className="reviews-count">({nrReviews})</div>
            </GradeContainer>
            <ReviewsProgressBars>
                {separatedReviews.map(([label, review]) => {
                    return (
                        <ProgressBarrRow
                            key={label}
                            className={styled.progress}
                        >
                            <div className="label"> {label} </div>
                            <div className="progress-bar-container">
                                <ProgressBar
                                    baseBgColor="#f3f3f3"
                                    bgColor="#057a8f"
                                    isLabelVisible={false}
                                    height="8px"
                                    completed={review.completed}
                                />
                            </div>
                        </ProgressBarrRow>
                    );
                })}
            </ReviewsProgressBars>
        </ReviewsContainer>
    );
}

function separateReviews(reviews, nrReviews) {
    return reviews.reduce(
        (acc, curr) => {
            const count = acc[curr.rating].count + 1;
            const newRow = {
                count: count,
                completed: (count / nrReviews) * 100,
            };
            return { ...acc, [curr.rating]: newRow };
        },
        {
            5: {
                count: 0,
                completed: 0,
            },
            4: {
                count: 0,
                completed: 0,
            },
            3: {
                count: 0,
                completed: 0,
            },
            2: {
                count: 0,
                completed: 0,
            },
            1: {
                count: 0,
                completed: 0,
            },
        }
    );
}
