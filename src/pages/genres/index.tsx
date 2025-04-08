import { NextPage } from "next";
import Head from "next/head";
import GenresPage from "@/src/components/GenresPage/GenresPage";

const Genres: NextPage = () => {
  return (
    <>
      <Head>
        <title>ВК Маруся - Жанры фильмов</title>
      </Head>
      <GenresPage />
    </>
  );
};

export default Genres;
