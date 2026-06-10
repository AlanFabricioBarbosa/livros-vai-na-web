import { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { FaBars, FaTimes, FaBookOpen } from "react-icons/fa";
import S from "./style.module.scss";

export default function Header() {
  const matchHome = useMatch("/");
  const matchDonatedBooks = useMatch("/donatedBooks");
  const matchToDonatedBooks = useMatch("/toDonatedBooks");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header className={`${S.header} ${scrolled ? S.scrolled : ""}`}>
      <div className={S["header-inner"]}>
        <Link to="/" className={S["title-container"]} onClick={closeMenu}>
          <img
            src={Logo}
            alt="Logo Livros Vai na Web"
            className={S.logo}
          />
          <span className={S["site-name"]}>Livros Vai na Web</span>
        </Link>

        <nav
          className={`${S["nav-container"]} ${isMenuOpen ? S.open : ""}`}
          aria-label="Navegação principal"
        >
          <Link
            to="/"
            className={`${S["nav-link"]} ${matchHome ? S.active : ""}`}
            onClick={closeMenu}
          >
            Início
          </Link>
          <Link
            to="/donatedBooks"
            className={`${S["nav-link"]} ${matchDonatedBooks ? S.active : ""}`}
            onClick={closeMenu}
          >
            Livros Doados
          </Link>
          <Link
            to="/toDonatedBooks"
            className={`${S["nav-link"]} ${matchToDonatedBooks ? S.active : ""}`}
            onClick={closeMenu}
          >
            <FaBookOpen className={S["nav-icon"]} />
            Doe um Livro
          </Link>
        </nav>

        <button
          className={S["menu-toggle"]}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={S["menu-overlay"]}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
