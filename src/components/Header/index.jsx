import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <header>
        <section>
          <img src={Logo} alt="" />
          <h1>Livros Vai na Web</h1>
        </section>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/donatedBooks">Livros doados</Link>
          <Link to="/ToDonatedBooks">Doe seu livro</Link>
        </nav>
      </header>
      <section>
        <input name="search" type="text" placeholder="O que você procura?" />
        <FaSearch />
      </section>
    </>
  );
}
