import YouTubeIcon from "@/src/icons/YouTubeIcon";
import VkIcon from "@/src/icons/VkIcon";
import OkIcon from "@/src/icons/OkIcon";
import TelegramIcon from "@/src/icons/TelegramIcon";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="socials">
          <li className="socials__item">
            <a className="socials__link" href={"https://vk.com/shch_00"}>
              {<VkIcon className="socials__icon" />}
            </a>
          </li>
          <li className="socials__item">
            <a
              className="socials__link"
              href={"https://www.youtube.com/@javascriptmastery"}
            >
              {<YouTubeIcon className="socials__icon" />}
            </a>
          </li>
          <li className="socials__item">
            <a
              className="socials__link"
              href={"https://ok.ru/video/9364180699722"}
            >
              {<OkIcon className="socials__icon" />}
            </a>
          </li>
          <li className="socials__item">
            <a className="socials__link" href={"https://t.me/ashas_alos"}>
              {<TelegramIcon className="socials__icon" />}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
