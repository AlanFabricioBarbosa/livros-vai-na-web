import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import S from "./style.module.scss";

export default function Home() {
  const matchHome = useMatch("/");
  const matchDonatedBooks = useMatch("donatedBooks");
  const matchToDonatedBooks = useMatch("ToDonatedBooks");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className={S}>
        <section className={S["title-container"]}>
          <img src={Logo} alt="" />
          <h1>Livros Vai na Web</h1>
        </section>
        <nav className={`${S["nav-container"]} ${isMenuOpen ? S.open : ""}`}>
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
            to="/ToDonatedBooks"
            className={`${S["nav-link"]} ${
              matchToDonatedBooks ? S.active : ""
            }`}
          >
            Doe Seu Livro
          </Link>
        </nav>
        <section className={S["input-btn"]}>
          <input
            name="search"
            type="text"
            placeholder="O que você procura?"
            disabled
          />
          <FaSearch />
        </section>
        <button className={S["menu-toggle"]} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
    </>
  );
}
