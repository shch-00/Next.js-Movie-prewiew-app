import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "@/src/store/hooks";
import { useEffect, useState } from "react";
import Head from "next/head";
import AccountPage from "../components/AccountPage/AccountPage";
import FavouritesPage from "../components/FavoritesPage/FavoritesPage";
import Loader from "../components/Loaders/Loader";

const Favourites: NextPage = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const localUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    if (user.name === "" && !localUser) {
      router.push("/home");
    }
  }, [user, router]);

  if (user.name === "") {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>ВК Маруся - Избранные фильмы</title>
      </Head>
      <AccountPage>
        <FavouritesPage />
      </AccountPage>
    </>
  );
};

export default Favourites;
