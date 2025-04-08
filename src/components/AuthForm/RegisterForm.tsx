import { FC, useState } from "react";
import type { IFormProps } from "@/src/components/AuthForm/AuthForm";
import { useRegister } from "@/src/hooks";
import Input from "@/src/components/Input/Input";
import MailIcon from "@/src/icons/MailIcon";
import PassIcon from "@/src/icons/PassIcon";
import UserIcon from "@/src/icons/UserIcon";

const RegisterForm: FC<IFormProps> = ({ onClick }) => {
  const mutation = useRegister();
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      name: formData.get("firstName") as string,
      surname: formData.get("lastName") as string,
      password: formData.get("password") as string,
    };

    if (data.password !== formData.get("confirmPassword")) {
      setIsError(true);
      return;
    }

    onClick("register-success");
    mutation.mutate(data);
  };

  return (
    <div className="auth-form__inner">
      <h2 className="auth-form__title">Регистрация</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Электронная почта"
          icon={<MailIcon className="input-icon" />}
          auth={true}
        />
        <Input
          placeholder="Имя"
          icon={<UserIcon className="input-icon" />}
          auth={true}
          name="firstName"
        />
        <Input
          placeholder="Фамилия"
          icon={<UserIcon className="input-icon" />}
          auth={true}
          name="lastName"
        />
        <Input
          type="password"
          placeholder="Пароль"
          icon={<PassIcon className="input-icon" />}
          auth={true}
        />
        <Input
          type="password"
          placeholder="Повторите пароль"
          icon={<PassIcon className="input-icon" />}
          auth={true}
          name="confirmPassword"
        />
        <button type="submit" className="auth-form__button btn">
          Создать аккаунт
        </button>
      </form>
      <button
        className="auth-form__redirect-btn"
        onClick={() => onClick("log-in")}
      >
        У меня есть пароль
      </button>
      {isError && (
        <div className="auth-form__error-message">Пароли не совпадают!</div>
      )}
    </div>
  );
};

export default RegisterForm;
