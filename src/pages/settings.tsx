import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "@/src/store/hooks";
import { useEffect, useState } from "react"; // Добавляем useState
import Head from "next/head";
import AccountPage from "@/src/components/AccountPage/AccountPage";
import SettingsPage from "@/src/components/SettingsPage/SettingsPage";
import Loader from "@/src/components/Loaders/Loader";

const Settings: NextPage = () => {
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
        <title>ВК Маруся - Настройки</title>
      </Head>
      <AccountPage>
        <SettingsPage />
      </AccountPage>
    </>
  );
};

export default Settings;
