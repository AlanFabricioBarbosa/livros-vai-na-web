import S from "./style.module.scss";
import FormBook from "../../assets/img/formBookImg.png";

export default function FormToDonated() {
  return (
    <section className={S["form-container"]}>
      <form action="">
        <fieldset>
          <img
            src={FormBook}
            alt="Representação minimalista de um livro com capa azul, simbolizando leitura ou conteúdo educacional."
          />
          <legend>Informações do Livro</legend>

          <label htmlFor="title">Titulo:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insira o título do livro"
            required
          />

          <label htmlFor="genre">Gênero:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Ex.: Romance, Ficção"
            required
          />

          <label htmlFor="author">Autor{"(a)"}:</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Nome do autor(a)"
            required
          />

          <label htmlFor="urlImg">Link da imagem:</label>
          <input
            type="url"
            id="urlImg"
            name="urlImg"
            placeholder="https://exemplo.com/imagem.jpg"
            required
          />

          <button type="submit">Doar</button>
        </fieldset>
      </form>
    </section>
  );
}
