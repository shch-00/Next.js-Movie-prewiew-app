import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useLogout } from "@/src/hooks";
import { toggleUser } from "@/src/store/userSlice";
import capitalize from "@/src/utils/capitalize";
import MailIcon from "@/src/icons/MailIcon";

const SettingsPage = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useLogout();

  const handleLogut = () => {
    mutate();
    dispatch(
      toggleUser({
        email: "",
        name: "",
        surname: "",
        password: "",
        favourites: [],
      })
    );
    localStorage.removeItem("user");
  };

  return (
    <div className="settings">
      <div className="settings__inner">
        <div className="settings__info">
          <div className="settings__avatar">
            <span className="settings__avatar-text">
              {(capitalize(user.name) + capitalize(user.surname)).toUpperCase()}
            </span>
          </div>
          <div className="settings__name">
            <span className="settings__tag">Имя Фамилия</span>
            <span className="settings__value">
              {`${capitalize(user.name).toUpperCase() + user.name.slice(1)} ${capitalize(user.surname).toUpperCase() + user.surname.slice(1)}`}
            </span>
          </div>
        </div>
        <div className="settings__info">
          <div className="settings__avatar">
            <MailIcon className="settings__icon" />
          </div>
          <div className="settings__name">
            <span className="settings__tag">Электронная почта</span>
            <span className="settings__value">{user.email}</span>
          </div>
        </div>
      </div>
      <button
        className="settings__button btn"
        disabled={isPending}
        onClick={handleLogut}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default SettingsPage;
