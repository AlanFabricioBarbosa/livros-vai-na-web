import { useState, useEffect } from "react";
import { fetchBooks } from "../../services/api.js";

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
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <img src={book.urlImg} alt={book.title} width="100" />
          <h3>{book.title}</h3>
          <p>Gênero: {book.genre}</p>
          <p>
            Autor{"(a)"}: {book.author}
          </p>
        </li>
      ))}
    </ul>
  );
}
