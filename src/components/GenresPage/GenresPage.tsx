import { useGenres } from "@/src/hooks";
import GenreCard from "@/src/components/GenreCard/GenreCard";
import Loader from "@/src/components/Loaders/Loader";

function GenresPage() {
  const { data, isError, isLoading, error } = useGenres();

  if (isLoading) {
    return (
      <div className="genres">
        <Loader />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return <div>Ошибка, повторите позже</div>;
  }

  return (
    <div className="genres">
      <h2 className="genres__head">Жанры фильмов</h2>
      <ul className="genres__list">
        {data
          ?.sort((a, b) => {
            if (a > b) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((genre) => (
            <li className="genres__item" key={genre}>
              <GenreCard genre={genre} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default GenresPage;
