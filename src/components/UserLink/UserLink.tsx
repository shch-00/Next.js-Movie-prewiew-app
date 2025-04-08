import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMe } from "@/src/hooks";
import capitalize from "@/src/utils/capitalize";
import Link from "next/link";
import Loader from "@/src/components/Loaders/Loader";
import UserIcon from "@/src/icons/UserIcon";

function UserLink({ onAuthClick }: { onAuthClick: () => void }) {
  const { data, isLoading, isError } = useMe();
  const location = useRouter().asPath;
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

  if (isLoading) {
    return (
      <div className="header__link--loading">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <button
        className={`header__link header__link--btn ${screenWidth <= 1023 ? "header__link--miniature" : ""}`}
        onClick={onAuthClick}
      >
        <span className="header__link-text">Войти</span>
        <UserIcon className="header__link-icon" />
      </button>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Link
      href={"/favorites"}
      className={`header__link ${location === "/favorites" || location === "/settings" ? "header__link--active" : ""} ${screenWidth <= 1023 && "header__link--miniature"}`}
    >
      <span className="header__link-text">
        {capitalize(data.name) + data.name.slice(1)}
      </span>
      <UserIcon className="header__link-icon" />
    </Link>
  );
}

export default UserLink;
