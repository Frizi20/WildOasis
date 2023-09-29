import styled from "styled-components";
import { useFavorites } from "../../context/FavoritesContext";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import useCabins from "../cabins/useCabins";
import AccommoidationItem from "./AccommoidationItem";
import useFavoriteCabins from "./useFavoriteCabins";

const ModalContainer = styled.div`
    width: 500px;
    max-height: 350px;
    max-width: 100%;
    /* padding: 50px; */
    & .empty {
        text-align: center;
        color: #7c7c7c;
        margin-top: 20px;
    }
`;

const AccommodationContainer = styled.div``;

const Header = styled.div`
    /* font-size: 1.2rem; */
    border-bottom: 1px solid gainsboro;
    font-weight: 500;
    color: #696969;
    text-align: center;
    padding-bottom: 10px;

    & h2{
         font-size: 2.175rem;
        font-weight: 500;
        color: #494949;
    }
`;

export default function FavoritesModal() {
    const { favoriteItems: favoriteCabinsIds } = useFavorites();
    const { cabins, isLoading } = useFavoriteCabins({ ids: favoriteCabinsIds });

    if (isLoading)
        return (
            <ModalContainer>
                <SpinnerMini />
            </ModalContainer>
        );


    return (
        <ModalContainer>
            <Header>
                <h2>Favorites</h2>
            </Header>
            {favoriteCabinsIds.length === 0 ? (
                <p className="empty">Favorites list is empty</p>
            ) : (
                <AccommodationContainer>
                    {cabins.map((cabin) => {
                        return (
                            <AccommoidationItem
                                key={cabin.id}
                                accommodation={cabin}
                            />
                        );
                    })}
                </AccommodationContainer>
            )}
        </ModalContainer>
    );
}
