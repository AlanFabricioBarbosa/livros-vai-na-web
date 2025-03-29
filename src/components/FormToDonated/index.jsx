import {useState} from 'react'
import S from "./style.module.scss";
import FormBook from "../../assets/img/formBookImg.png";
import axios from 'axios'


export default function FormToDonated() {

  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [autor, setAutor] = useState("")
  const [imagem_url, setImagem] = useState("")

  const enviarDados = async() => {
    const urlApi = "https://api-livros-vnw-e8he.onrender.com/livros/doar"

    const dadosEnviar = {
      titulo,
      categoria,
      autor,
      imagem_url
    }

    await axios.post(urlApi, dadosEnviar)

    alert("Livro Enviado!")

    setTitulo("")
    setCategoria("")
    setAutor("")
    setImagem("")
  }

  const capturaTitulo = (e) =>{
    setTitulo(e.target.value)
  }

  const capturaCategoria = (e) =>{
    setCategoria(e.target.value)
  }

  const capturaAutor = (e) =>{
    setAutor(e.target.value)
  }

  const capturaImagem = (e) =>{
    setImagem(e.target.value)
  }

  return (
    <section className={S["form-container"]}>
      <form onSubmit={(e) => e.preventDefault()} >
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
            onChange={capturaTitulo}
            value={titulo}
            required
          />

          <label htmlFor="genre">Gênero:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Ex.: Romance, Ficção"
            onChange={capturaCategoria}
            value={categoria}
            required
          />

          <label htmlFor="author">Autor{"(a)"}:</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Nome do autor(a)"
            onChange={capturaAutor} 
            value={autor}
            required
          />

          <label htmlFor="urlImg">Link da imagem:</label>
          <input
            type="url"
            id="urlImg"
            name="urlImg"
            placeholder="https://exemplo.com/imagem.jpg"
            onChange={capturaImagem}
            value={imagem_url}
            required
          />

          <button type="submit" onClick={enviarDados}>Doar</button>
        </fieldset>
      </form>
    </section>
  );
}
