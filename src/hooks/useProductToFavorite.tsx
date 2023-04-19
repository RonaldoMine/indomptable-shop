import {FavoriteContext} from "../context/FavoriteContext";
import {useContext} from "react";

export default function useProductToFavorite() {
    return useContext(FavoriteContext)
}
