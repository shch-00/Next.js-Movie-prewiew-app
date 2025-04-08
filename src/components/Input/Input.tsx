import type { FC } from "react";
import type React from "react";
import { useState, useEffect } from "react";
import CloseIcon from "@/src/icons/CloseIcon";
import { useModal } from "@/src/contexts/ModalContext";

interface InputProps {
  type?: "text" | "search" | "password" | "email";
  name?: string;
  placeholder: string;
  icon?: React.ReactElement;
  auth?: boolean;
  setTitle?: (value: string | undefined) => void;
  children?: any;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  icon,
  name,
  setTitle,
  auth = false,
  children,
}) => {
  // const [focused, setFocused] = useState<boolean>(false);
  const { isModalOpen: focused, closeModal, openModal } = useModal();
  const [searchValue, setSearchValue] = useState("");
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

  const handleTitleChange = (value: string) => {
    if (setTitle) {
      setTitle(value);
      setSearchValue(value);
    }
  };

  const handleCloseSearch = () => {
    document.body.style.overflow = "auto";
    closeModal();
    setTitle && setTitle(undefined);
    setSearchValue("");
  };

  return (
    <>
      {!auth ? (
        <>
          <div
            className={`dark-bg ${focused ? "dark-bg--opened" : ""}`}
            onClick={handleCloseSearch}
          ></div>
          <div
            className={`custom-input ${type === "search" ? "custom-input--search" : ""} ${focused ? "custom-input--focused" : ""} ${screenWidth <= 1023 ? "custom-input--miniature" : ""}`}
          >
            {icon}
            <input
              className="custom-input__field"
              id="search-string"
              type={type}
              name={type}
              placeholder={placeholder}
              onFocus={() => {
                openModal();
                document.body.style.overflow = "hidden";
              }}
              value={searchValue}
              onChange={(event) => handleTitleChange(event.target.value)}
              autoComplete="off"
            />
            <label htmlFor="search-string" className="custom-input__label">
              {icon}
            </label>
            <button
              className="close-button"
              onClick={() => handleCloseSearch()}
            >
              <CloseIcon className="close-icon" />
            </button>
            {children}
          </div>
        </>
      ) : (
        <div className="custom-input">
          {icon}
          <input
            className="custom-input__field"
            type={type}
            name={name ? name : type}
            placeholder={placeholder}
            onFocus={() => {
              openModal();
              document.body.style.overflow = "hidden";
            }}
            autoComplete="off"
          />
        </div>
      )}
    </>
  );
};

export default Input;
