import { styled } from "styled-components";
import styles from "./css/Accommodation.module.css";
import { HiStar, HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const StyledAccommoidationItem = styled.div`
    background-color: ;
    /* border: 1px solid gainsboro; */
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 16px 1px gainsboro;
    }
`;

export default function AccommoidationItem({ accommodation }) {
    const { regularPrice, image } = accommodation;
    const navigate = useNavigate();

    return (
        <StyledAccommoidationItem
            className={styles.acc}
            onClick={() => {
                navigate(`booking/${accommodation.id}`);
            }}
        >
            <div className="img-container">
                <img src={image} alt="" />
            </div>
            <div className="details">
                <div className="location-rating">
                    <div className="location">Richiș, Romania</div>
                    <div className="rating">
                        <HiStar /> <span> 5 </span>
                    </div>
                </div>

                <div className="price-max">
                    <div className="suggestion-interval">
                        <span className="from">10 Sept</span>-
                        <span className="to">20 Sept</span>
                    </div>
                    {/* <div className="location-info">
                        <HiUserGroup /> {maxCapacity}
                    </div> */}
                </div>

                <div className="price-details">
                    <span>{regularPrice} lei</span> night
                </div>
            </div>
        </StyledAccommoidationItem>
    );
}
