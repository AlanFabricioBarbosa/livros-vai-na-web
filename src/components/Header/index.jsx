import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/donatedBooks">Livros doados</Link>
          <Link to="/ToDonatedBooks">Doe seu livro</Link>
        </nav>
      </header>
    </>
  );
}
