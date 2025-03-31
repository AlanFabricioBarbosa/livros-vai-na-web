import { useState } from "react";
import S from "./style.module.scss";
import FormBook from "../../assets/img/formBookImg.png";
import axios from "axios";

export default function FormToDonated() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem_url, setImagem] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarDados = async () => {
    setLoading(true);
    const urlApi = "https://api-livros-vnw-e8he.onrender.com/doar";

    const dadosEnviar = { titulo, categoria, autor, imagem_url };

    try {
      await axios.post(urlApi, dadosEnviar);
      alert("Livro enviado com sucesso!");
      setTitulo("");
      setCategoria("");
      setAutor("");
      setImagem("");
    } catch (error) {
      alert("Erro ao enviar o livro. Tente novamente.");
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={S["form-container"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <img
            src={FormBook}
            alt="Representação minimalista de um livro com capa azul, simbolizando leitura ou conteúdo educacional."
          />
          <legend>Informações do Livro</legend>

          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insira o título do livro"
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            required
          />

          <label htmlFor="genre">Gênero:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Ex.: Romance, Ficção"
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
            required
          />

          <label htmlFor="author">Autor(a):</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Nome do autor(a)"
            onChange={(e) => setAutor(e.target.value)}
            value={autor}
            required
          />

          <label htmlFor="urlImg">Link da imagem:</label>
          <input
            type="url"
            id="urlImg"
            name="urlImg"
            placeholder="https://exemplo.com/imagem.jpg"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem_url}
            required
          />

          <button type="submit" onClick={enviarDados} disabled={loading}>
            {loading ? "Enviando..." : "Doar"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
