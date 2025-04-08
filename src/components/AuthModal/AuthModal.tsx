import { useAuthModal } from "@/src/contexts/AuthModalContext";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import CloseIcon from "@/src/icons/CloseIcon";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  document.body.style.overflow = "hidden";
  const { closeAuthModal } = useAuthModal();
  return (
    <div className="form">
      <div
        className="dark-bg dark-bg--opened animate-fadeIn"
        onClick={closeAuthModal}
      ></div>
      <div className="form__inner animate-scaleIn-modals">
        <AuthForm />
        <button className="close-btn" onClick={onClose}>
          <CloseIcon className="window-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
