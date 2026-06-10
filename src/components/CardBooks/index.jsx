import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchBooks } from "../../services/api.js";
import { FaExclamationTriangle, FaRedo, FaBook, FaHeart } from "react-icons/fa";
import S from "./style.module.scss";

function SkeletonCard() {
  return (
    <li className={S["skeleton-card"]}>
      <div className={S["skeleton-img"]} />
      <div className={S["skeleton-title"]} />
      <div className={S["skeleton-text"]} />
      <div className={S["skeleton-text-sm"]} />
    </li>
  );
}

export default function CardBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState("Todos");

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Gêneros únicos para os filtros
  const genres = useMemo(() => {
    const unique = [...new Set(books.map((b) => b.genre))].sort();
    return ["Todos", ...unique];
  }, [books]);

  const filtered = useMemo(
    () =>
      activeGenre === "Todos"
        ? books
        : books.filter((b) => b.genre === activeGenre),
    [books, activeGenre]
  );

  const communityCount = books.filter((b) => b.source === "community").length;

  if (loading) {
    return (
      <section className={S["card-books-container"]}>
        <div className={S["loading-hint"]}>
          <span className={S["loading-spinner"]} />
          Buscando livros em múltiplas fontes…
        </div>
        <ul className={S["books-grid"]}>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      </section>
    );
  }

  if (error) {
    return (
      <section className={S["card-books-container"]}>
        <div className={S["error-state"]}>
          <FaExclamationTriangle className={S["error-icon"]} />
          <h3>Não foi possível carregar os livros</h3>
          <p>{error}</p>
          <button className={S["retry-btn"]} onClick={loadBooks}>
            <FaRedo /> Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className={S["card-books-container"]}>
        <div className={S["empty-state"]}>
          <FaBook className={S["empty-icon"]} />
          <h3>Nenhum livro disponível</h3>
          <p>Ainda não há livros. Seja o primeiro a doar!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={S["card-books-container"]}>
      {/* Barra de estatísticas */}
      <div className={S["stats-bar"]}>
        <span className={S["stats-total"]}>
          <FaBook /> {books.length} livros disponíveis
        </span>
        {communityCount > 0 && (
          <span className={S["stats-community"]}>
            <FaHeart /> {communityCount} doados pela comunidade
          </span>
        )}
      </div>

      {/* Filtros por gênero */}
      <div
        className={S["genre-filters"]}
        role="group"
        aria-label="Filtrar por gênero"
      >
        {genres.map((genre) => (
          <button
            key={genre}
            className={`${S["genre-btn"]} ${
              activeGenre === genre ? S["genre-btn--active"] : ""
            }`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
            {genre !== "Todos" && (
              <span className={S["genre-count"]}>
                {books.filter((b) => b.genre === genre).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid de livros */}
      {filtered.length === 0 ? (
        <div className={S["empty-state"]}>
          <FaBook className={S["empty-icon"]} />
          <p>Nenhum livro neste gênero ainda.</p>
        </div>
      ) : (
        <ul className={S["books-grid"]}>
          {filtered.map((book) => (
            <li key={book.id} className={S["book-card"]}>
              {book.source === "community" && (
                <div
                  className={S["community-badge"]}
                  title="Doado pela comunidade"
                >
                  <FaHeart />
                </div>
              )}
              <div className={S["book-img-wrapper"]}>
                <img
                  src={book.urlImg}
                  alt={`Capa do livro: ${book.title}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='%23003a6b'/%3E%3Ctext x='100' y='150' text-anchor='middle' font-family='sans-serif' font-size='13' fill='white' opacity='.6'%3ESem capa%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className={S["book-info"]}>
                <span className={S["book-genre"]}>{book.genre}</span>
                <h3 className={S["book-title"]}>{book.title}</h3>
                <p className={S["book-author"]}>por {book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
