import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/src/contexts/AuthModalContext";
import { useMe } from "@/src/hooks";
import { useAppDispatch } from "@/src/store/hooks";
import { toggleUser } from "@/src/store/userSlice";
import Link from "next/link";
import AuthModal from "@/src/components/AuthModal/AuthModal";
import SearchList from "@/src/components/SearchList/SearchList";
import UserLink from "@/src/components/UserLink/UserLink";
import GenresIcon from "@/src/icons/GenresIcon";

const Header = () => {
  const { data: userData } = useMe();
  const location = useRouter().asPath;
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthModal();
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

  useEffect(() => {
    if (userData) {
      dispatch(toggleUser(userData));
    }
  }, [userData, dispatch]);

  return (
    <>
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => {
            closeAuthModal();
            document.body.style.overflow = "auto";
          }}
        />
      )}
      <header className="header">
        <div className="container">
          <div className="header__content">
            <Link
              href={"/home"}
              className="header__logo-link"
              style={{ margin: screenWidth <= 1023 ? "0 auto 0 0" : "0" }}
            >
              <img
                src="/main-logo.png"
                alt="Логотип сайта"
                className="header__img"
              />
            </Link>
            <div className="header__links">
              <Link
                href={"/home"}
                className={`header__link ${location === "/home" ? "header__link--active" : ""} ${screenWidth <= 1023 ? "header__link--disabled" : ""}`}
              >
                <span className="header__link-text">Главная</span>
              </Link>
              <Link
                href={"/genres"}
                className={`header__link ${location === "/genres" ? "header__link--active" : ""} ${screenWidth <= 1023 ? "header__link--miniature" : ""}`}
              >
                <div>
                  <span className="header__link-text">Жанры</span>
                  <GenresIcon className="header__link-icon" />
                </div>
              </Link>
            </div>
            <SearchList />
            <UserLink
              onAuthClick={() => {
                openAuthModal();
                document.body.style.overflow = "hidden";
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
