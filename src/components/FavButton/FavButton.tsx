import { useChangeFavourites } from "@/src/hooks";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthModal } from "@/src/contexts/AuthModalContext";
import { toggleUser } from "@/src/store/userSlice";
import FavouriteIcon from "@/src/icons/FavoriteIcon";
import FavouriteAddedIcon from "@/src/icons/FavoriteAddedIcon";
import CloseIcon from "@/src/icons/CloseIcon";

const FavButton = ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
  const { mutate, isPending } = useChangeFavourites();
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const { openAuthModal } = useAuthModal();
  const isFavoriteAdded = user.favorites?.includes(id);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (user.name === "") {
      openAuthModal();
      return;
    }

    mutate(
      {
        id,
        purpose: isFavorite ? (isFavoriteAdded ? "delete" : "add") : "delete",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["favorites"] });

          const newFavorites = isFavorite
            ? isFavoriteAdded
              ? user.favorites?.filter((fid) => fid !== id)
              : [...user.favorites, id]
            : user.favorites?.filter((fid) => fid !== id);

          dispatch(
            toggleUser({
              ...user,
              favorites: newFavorites,
            })
          );
        },
      }
    );
  };

  if (isFavorite) {
    return (
      <button
        className={`button button--favourite btn ${isFavoriteAdded ? "button--added" : ""}`}
        onClick={handleClick}
      >
        {isFavoriteAdded ? (
          <FavouriteAddedIcon className="button__icon animate-scaleIn-buttons" />
        ) : (
          <FavouriteIcon className="button__icon" />
        )}
      </button>
    );
  }

  return (
    <button
      className="movie-card__delete"
      onClick={handleClick}
      disabled={isPending}
    >
      <CloseIcon className="movie-card__icon-close" />
    </button>
  );
};

export default FavButton;
