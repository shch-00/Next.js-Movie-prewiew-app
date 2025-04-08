import Link from "next/link";
import capitalize from "@/src/utils/capitalize";

const GenreCard = ({ genre }: { genre: string }) => {
  return (
    <div className="genre-card">
      <img
        className="genre-card__img"
        src={`/images/genres-${genre}.jpg`}
        alt={`Постер для жанра ${genre}`}
      />
      <div className="genre-card__inner">
        <span className="genre-card__title">
          {capitalize(genre) + genre.slice(1)}
        </span>
      </div>
      <Link href={`/genres/${genre}`} className="genre-card__link"></Link>
    </div>
  );
};

export default GenreCard;
