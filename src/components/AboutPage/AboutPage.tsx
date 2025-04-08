import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMovie } from "../../hooks";
import Head from "next/head";
import MovieHero from "@/src/components/MovieHero/MovieHero";
import Loader from "@/src/components/Loaders/Loader";

const AboutPage = () => {
  const movieId = Number(useRouter().asPath.split("/")[1]);

  const [id, setId] = useState(movieId);

  const { data, isLoading, isError, refetch } = useMovie(movieId);

  const handleChangeSearchedMovie = (movieId: number) => {
    setId(movieId);
    refetch();
  };

  useEffect(() => {
    id !== movieId ? handleChangeSearchedMovie(movieId) : () => {};
  }, [id, movieId]);

  if (isLoading) {
    return (
      <div className="about">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  if (data) {
    return (
      <>
        <Head>
          <title>ВК Маруся - О фильме {data.title}</title>
        </Head>
        <div className="about">
          <MovieHero movie={data} />
          <div className="info">
            <h2 className="info__head">О фильме</h2>
            <ul className="info__list">
              {data.language !== "" && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Язык оригинала</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.language}</span>
                </li>
              )}
              {data.budget && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Бюджет</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.budget}</span>
                </li>
              )}
              {data.revenue && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Выручка</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.revenue}</span>
                </li>
              )}
              {data.director && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Режиссёр</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.director}</span>
                </li>
              )}
              {data.production && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Продакшен</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.production}</span>
                </li>
              )}
              {data.awardsSummary && (
                <li className="info__item">
                  <div className="info__title-wrapper">
                    <span className="info__title">Награды</span>
                    <div className="info__dashed"></div>
                  </div>
                  <span className="info__value">{data.awardsSummary}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default AboutPage;
