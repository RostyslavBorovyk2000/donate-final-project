import { useSelector } from "react-redux";
import { ReactComponent as HeartSVG } from "./icons/heart.svg";
import { ReactComponent as HeartFillSVG } from "./icons/heart-fill.svg";

function HeartFavorite() {
  const favorites = useSelector((state) => state.favorites.items);
  const isFavoritesEmpty = favorites.length === 0;

  return (
    isFavoritesEmpty ? <HeartSVG /> : <HeartFillSVG />
  );
}

export default HeartFavorite;
