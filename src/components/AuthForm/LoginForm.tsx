import type { FC } from "react";
import type { IFormProps } from "@/src/components/AuthForm/AuthForm";
import { useLogin } from "@/src/hooks";
import Input from "@/src/components/Input/Input";
import MailIcon from "@/src/icons/MailIcon";
import PassIcon from "@/src/icons/SearchIcon";

const LoginForm: FC<IFormProps> = ({ onClick }) => {
  const { mutate, isError } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    mutate(data);

    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <div className="auth-form__inner">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Электронная почта"
          icon={<MailIcon className="input-icon" />}
          auth={true}
        />
        <Input
          type="password"
          placeholder="Пароль"
          icon={<PassIcon className="input-icon" />}
          auth={true}
        />
        <button type="submit" className="auth-form__button btn">
          Войти
        </button>
      </form>
      <button
        className="auth-form__redirect-btn"
        onClick={() => onClick("sign-up")}
      >
        Регистрация
      </button>
      {isError && (
        <div className="auth-form__error-message">
          Неправильный email или пароль
        </div>
      )}
    </div>
  );
};

export default LoginForm;
