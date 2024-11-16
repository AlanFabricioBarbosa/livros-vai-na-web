import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import S from "./style.module.scss";

export default function Footer() {
  return (
    <footer className={S}>
      <section className={S["contact-container"]}>
        <p>4002 - 8922</p>
        <ul>
          <li>
            <a
              href="https://pt-br.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className={S["icons-contact"]} />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/home"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className={S["icons-contact"]} />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className={S["icons-contact"]} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin className={S["icons-contact"]} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className={S["icons-contact"]} />
            </a>
          </li>
        </ul>
      </section>
      <section className={S["text-content"]}>
        <p>Layout desenvolvido pela Vai Na Web para fins educativos - 2024</p>
      </section>
    </footer>
  );
}
