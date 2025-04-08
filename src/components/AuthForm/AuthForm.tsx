import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "@/src/components/AuthForm/LoginForm";
import RegisterForm from "@/src/components/AuthForm/RegisterForm";
import RegisteredForm from "@/src/components/AuthForm/RegisteredForm";

export interface IFormProps {
  onClick: (value: "log-in" | "sign-up" | "register-success") => void;
}

const AuthForm = () => {
  const [authState, setAuthState] = useState<
    "log-in" | "sign-up" | "register-success"
  >("log-in");

  console.log(authState);

  return (
    <motion.div className="auth-form">
      <img
        src="/main-logo-black.png"
        alt="Логотип сайта"
        className="auth-form__logo"
      />
      {authState === "log-in" && (
        <motion.div
          key={authState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginForm onClick={setAuthState} />
        </motion.div>
      )}
      {authState === "sign-up" && (
        <motion.div
          key={authState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RegisterForm onClick={setAuthState} />
        </motion.div>
      )}
      {authState === "register-success" && (
        <motion.div
          key={authState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RegisteredForm onClick={setAuthState} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AuthForm;
