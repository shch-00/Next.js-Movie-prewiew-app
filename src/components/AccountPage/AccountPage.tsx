import type { FC } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import FavouriteIcon from "@/src/icons/FavoriteIcon";
import UserIcon from "@/src/icons/UserIcon";

interface AccountPageProps {
  children?: JSX.Element;
}

const AccountPage: FC<AccountPageProps> = ({ children = <></> }) => {
  const location = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div layout className="account">
      <h1 className="account__head">Мой аккаунт</h1>
      <div className="account__links">
        <Link
          href={"/favorites"}
          className={`account__link ${location.asPath === "/favorites" ? "account__link--active" : ""}`}
        >
          <FavouriteIcon className="account__icon" />
          <span>{screenWidth <= 767 ? "Избранное" : "Избранные фильмы"}</span>
        </Link>
        <Link
          href={"/settings"}
          className={`account__link ${location.asPath === "/settings" ? "account__link--active" : ""}`}
        >
          <UserIcon className="account__icon" />
          <span>{screenWidth <= 767 ? "Настройки" : "Настройка аккаунта"}</span>
        </Link>
      </div>
      {children}
    </motion.div>
  );
};

export default AccountPage;
