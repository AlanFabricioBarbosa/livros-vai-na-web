import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import S from "./style.module.scss";

export default function Header() {
  const matchHome = useMatch("/");
  const matchDonatedBooks = useMatch("/donatedBooks");
  const matchToDonatedBooks = useMatch("/toDonatedBooks");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={S.header}>
      <section className={S["title-container"]}>
        <img src={Logo} alt="Logo" />
        <h1>Livros Vai na Web</h1>
      </section>

      <nav
        className={`${S["nav-container"]} ${isMenuOpen ? S.open : ""}`}
        onClick={closeMenu}
      >
        <Link
          to="/"
          className={`${S["nav-link"]} ${matchHome ? S.active : ""}`}
        >
          Início
        </Link>
        <Link
          to="/donatedBooks"
          className={`${S["nav-link"]} ${matchDonatedBooks ? S.active : ""}`}
        >
          Livros Doados
        </Link>
        <Link
          to="/toDonatedBooks"
          className={`${S["nav-link"]} ${matchToDonatedBooks ? S.active : ""}`}
        >
          Doe Seu Livro
        </Link>
      </nav>

      <section className={S["input-btn"]}>
        <input name="search" type="text" placeholder="O que você procura?" />
        <FaSearch />
      </section>

      <button className={S["menu-toggle"]} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMenuOpen && <div className={S["menu-overlay"]} onClick={closeMenu} />}
    </header>
  );
}
