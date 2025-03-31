import axios from "axios";

export async function fetchBooks() {
  const url = `https://api-livros-vnw-e8he.onrender.com/livros`;
  try {
    const response = await axios.get(url);
    return response.data.map((item) => ({
      id: item.id,
      title: item.titulo,
      author: item.autor || "Autor desconhecido",
      genre: item.genero || "Gênero não informado",
      urlImg: item.imagem || "https://via.placeholder.com/100",
    }));
  } catch (error) {
    throw new Error(error.message);
  }
}

