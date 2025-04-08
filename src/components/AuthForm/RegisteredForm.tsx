import { FC } from "react";
import type { IFormProps } from "@/src/components/AuthForm/AuthForm";

const RegisteredForm: FC<IFormProps> = ({ onClick }) => {
  return (
    <div className="auth-form__inner">
      <h2 className="auth-form__title">Регистрация</h2>
      <p className="auth-form__text">
        Используйте вашу электронную почту для входа
      </p>
      <button
        className="auth-form__button btn"
        onClick={() => onClick("log-in")}
      >
        Войти
      </button>
    </div>
  );
};

export default RegisteredForm;
