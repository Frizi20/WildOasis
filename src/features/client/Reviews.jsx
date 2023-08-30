import { HiStar } from "react-icons/hi2";
import { styled } from "styled-components";
import styles from "./Reviews.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

console.log(styles);

const ReviewsContainer = styled.div`
    /* height: 200px; */
    border: 1px solid gainsboro;
    display: flex;
    /* align-items: center; */
`;

const GradeContainer = styled.div`
    border: 1px solid gainsboro;
    flex: 0 0 200px;

    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
    }

    & .progress-bar-container {
        flex: 1;
        padding-right: 10px;
        /* padding: 10px; */
    }
`;

export default function Reviews() {
    return (
        <ReviewsContainer>
            <GradeContainer>
                <div className="grade">4.7</div>
                <div className="stars">
                    <HiStar />
                    <HiStar />
                    <HiStar />
                    <HiStar />
                    <HiStar />
                </div>
                <div className="reviews-count">(526)</div>
            </GradeContainer>
            <ReviewsProgressBars>
                <ProgressBarrRow className={styled.progress}>
                    <div className="label">5</div>
                    <div className="progress-bar-container">
                        <ProgressBar
                            baseBgColor="#f3f3f3"
                            bgColor="#057a8f"
                            isLabelVisible={false}
                            height="10px"
                            completed={90}
                        />
                    </div>
                </ProgressBarrRow>
                <ProgressBarrRow>
                    <div className="label">4</div>
                    <div className="progress-bar-container">
                        <ProgressBar
                            baseBgColor="#f3f3f3"
                            bgColor="#057a8f"
                            isLabelVisible={false}
                            height="10px"
                            completed={20}
                        />
                    </div>
                </ProgressBarrRow>
                <ProgressBarrRow>
                    <div className="label">3</div>
                    <div className="progress-bar-container">
                        <ProgressBar
                            baseBgColor="#f3f3f3"
                            bgColor="#057a8f"
                            isLabelVisible={false}
                            height="10px"
                            completed={20}
                        />
                    </div>
                </ProgressBarrRow>
                <ProgressBarrRow>
                    <div className="label">2</div>
                    <div className="progress-bar-container">
                        <ProgressBar
                            baseBgColor="#f3f3f3"
                            bgColor="#057a8f"
                            isLabelVisible={false}
                            height="10px"
                            completed={20}
                        />
                    </div>
                </ProgressBarrRow>
                <ProgressBarrRow>
                    <div className="label">1</div>
                    <div className="progress-bar-container">
                        <ProgressBar
                            baseBgColor="#f3f3f3"
                            bgColor="#057a8f"
                            isLabelVisible={false}
                            height="10px"
                            completed={20}
                        />
                    </div>
                </ProgressBarrRow>
            </ReviewsProgressBars>
        </ReviewsContainer>
    );
}
