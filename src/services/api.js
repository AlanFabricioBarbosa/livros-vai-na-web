import axios from "axios";

export async function fetchBooks(query = "javascript") {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  try {
    const response = await axios.get(url);
    return response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Autor desconhecido",
      genre: item.volumeInfo.categories?.join(", ") || "Gênero não informado",
      urlImg:
        item.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/100",
    }));
  } catch (error) {
    throw new Error(error.message);
  }
}
