import { useState, useEffect } from "react";
import { fetchBooks } from "../../services/api.js";
import S from "./style.module.scss";

export default function CardBooks() {
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
      setLoaded(true);
    } else {
      async function loadBooks() {
        try {
          const booksData = await fetchBooks("javascript");
          setBooks(booksData);
          localStorage.setItem("books", JSON.stringify(booksData));
          setLoaded(true);
        } catch (error) {
          console.error("Erro ao carregar livros:", error.message);
        }
      }
      loadBooks();
    }
  }, []);

  if (!loaded) {
    return <p>Carregando livros...</p>;
  }

  return (
    <section className={S["card-books-container"]}>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <img src={book.urlImg} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Gênero: {book.genre}</p>
            <p>Por: {book.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
