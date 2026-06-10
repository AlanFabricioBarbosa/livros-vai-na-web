import { useState } from "react";
import { donateBook } from "../../services/api.js";
import { FaCheckCircle, FaExclamationCircle, FaBookOpen } from "react-icons/fa";
import S from "./style.module.scss";

export default function FormToDonated() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem_url, setImagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', msg }

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 5000);
  };

  const enviarDados = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await donateBook({ titulo, categoria, autor, imagem_url });
      showFeedback("success", "Livro enviado com sucesso! Obrigado pela sua doação. 🎉");
      setTitulo("");
      setCategoria("");
      setAutor("");
      setImagem("");
    } catch (error) {
      showFeedback("error", error.message || "Erro ao enviar o livro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={S["form-container"]}>
      <form onSubmit={enviarDados} noValidate>
        <div className={S["form-header"]}>
          <FaBookOpen className={S["form-icon"]} />
          <h2 className={S["form-title"]}>Informações do Livro</h2>
          <p className={S["form-desc"]}>
            Preencha os dados abaixo para realizar sua doação
          </p>
        </div>

        {feedback && (
          <div className={`${S.feedback} ${S[`feedback-${feedback.type}`]}`}>
            {feedback.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaExclamationCircle />
            )}
            <span>{feedback.msg}</span>
          </div>
        )}

        <div className={S["form-body"]}>
          <div className={S["form-group"]}>
            <label htmlFor="title">Título do livro</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ex.: O Pequeno Príncipe"
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo}
              required
            />
          </div>

          <div className={S["form-group"]}>
            <label htmlFor="genre">Gênero / Categoria</label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Ex.: Romance, Ficção Científica"
              onChange={(e) => setCategoria(e.target.value)}
              value={categoria}
              required
            />
          </div>

          <div className={S["form-group"]}>
            <label htmlFor="author">Autor(a)</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Nome do autor(a)"
              onChange={(e) => setAutor(e.target.value)}
              value={autor}
              required
            />
          </div>

          <div className={S["form-group"]}>
            <label htmlFor="urlImg">Link da capa (opcional)</label>
            <input
              type="url"
              id="urlImg"
              name="urlImg"
              placeholder="https://exemplo.com/imagem.jpg"
              onChange={(e) => setImagem(e.target.value)}
              value={imagem_url}
            />
          </div>

          <button type="submit" className={S["submit-btn"]} disabled={loading}>
            {loading ? (
              <>
                <span className={S.spinner} />
                Enviando...
              </>
            ) : (
              "Realizar Doação"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

