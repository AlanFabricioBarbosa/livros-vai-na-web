import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import S from "./style.module.scss";

const socialLinks = [
  { href: "https://pt-br.facebook.com/", label: "Facebook", icon: FaFacebook, color: "#1877f2" },
  { href: "https://x.com/home", label: "X (Twitter)", icon: FaXTwitter, color: "#000000" },
  { href: "https://www.youtube.com/", label: "YouTube", icon: FaYoutube, color: "#ff0000" },
  { href: "https://www.linkedin.com/feed/", label: "LinkedIn", icon: FaLinkedinIn, color: "#0a66c2" },
  { href: "https://www.instagram.com/", label: "Instagram", icon: FaInstagram, color: "#e1306c" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={S.footer}>
      <div className={S["footer-inner"]}>
        <section className={S["contact-container"]}>
          <div className={S["footer-brand"]}>
            <p className={S["footer-title"]}>Livros Vai na Web</p>
            <p className={S["footer-subtitle"]}>
              Conectando leitores, transformando vidas
            </p>
          </div>

          <div className={S["social-container"]}>
            <p className={S["social-label"]}>Nos siga</p>
            <ul className={S["social-list"]}>
              {socialLinks.map(({ href, label, icon: Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={S["social-link"]}
                    style={{ "--icon-color": color }}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={S["text-content"]}>
          <p>
            © {year} Layout desenvolvido pela{" "}
            <strong>Vai Na Web</strong> para fins educativos.
          </p>
        </section>
      </div>
    </footer>
  );
}

