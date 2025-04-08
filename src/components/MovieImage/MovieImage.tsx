import type { FC } from "react";
import ImageLoader from "@/src/components/Loaders/ImageLoader";

interface IMovieImageProps {
  backdropUrl?: string | null;
  title: string | null;
  isLoading: boolean;
  onLoad: () => void;
}

const MovieImage: FC<IMovieImageProps> = ({
  backdropUrl,
  title = "Invalid Title",
  isLoading,
  onLoad,
}) => {
  return (
    <div className="movie-backdrop">
      {isLoading && <ImageLoader />}
      <img
        src={
          backdropUrl ||
          `https://placehold.co/700/692a78/FFFFFF/?font=raleway&text=${title}`
        }
        className="movie-backdrop__img"
        alt={`Постер к фильму "${title}"`}
        onLoad={onLoad}
        style={{ display: isLoading ? "none" : "initial" }}
      />
    </div>
  );
};

export default MovieImage;
