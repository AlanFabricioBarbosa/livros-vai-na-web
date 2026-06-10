import axios from "axios";

const COMMUNITY_API = "https://api-livros-vnw-e8he.onrender.com";
const OPEN_LIBRARY_API = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b/id";

// SVG inline como fallback quando imagem não é fornecida
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='%23003a6b'/%3E%3Crect x='30' y='40' width='140' height='180' rx='4' fill='%23005695'/%3E%3Crect x='40' y='55' width='120' height='8' rx='2' fill='%2300aaff' opacity='.7'/%3E%3Crect x='40' y='75' width='90' height='6' rx='2' fill='white' opacity='.4'/%3E%3Crect x='40' y='90' width='110' height='6' rx='2' fill='white' opacity='.3'/%3E%3Crect x='40' y='105' width='80' height='6' rx='2' fill='white' opacity='.3'/%3E%3Ctext x='100' y='220' text-anchor='middle' font-family='sans-serif' font-size='11' fill='white' opacity='.6'%3ESem capa%3C/text%3E%3C/svg%3E";

// Gêneros para buscar na Open Library — resultados variados
const OPEN_LIBRARY_QUERIES = [
  { query: "romance brasileiro", genre: "Romance" },
  { query: "ficção científica", genre: "Ficção Científica" },
  { query: "aventura classico", genre: "Aventura" },
  { query: "filosofia", genre: "Filosofia" },
  { query: "machado de assis", genre: "Clássico Brasileiro" },
  { query: "história do brasil", genre: "História" },
  { query: "auto ajuda", genre: "Autoajuda" },
  { query: "mistério policial", genre: "Mistério" },
];

/**
 * Busca livros variados na Open Library (catálogo público gratuito).
 * Faz múltiplas buscas em paralelo por gênero para garantir variedade.
 */
export async function fetchPublicBooks() {
  // Escolhe 4 queries aleatórias para não mostrar sempre os mesmos
  const shuffled = [...OPEN_LIBRARY_QUERIES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 4);

  const requests = selected.map(({ query, genre }) =>
    axios
      .get(`${OPEN_LIBRARY_API}/search.json`, {
        params: {
          q: query,
          limit: 6,
          fields: "key,title,author_name,cover_i,subject",
        },
        timeout: 10000,
      })
      .then((res) =>
        (res.data.docs || [])
          .filter((book) => book.cover_i) // Só incluir livros com capa
          .slice(0, 4)
          .map((book) => ({
            id: `ol-${book.key}`,
            title: book.title,
            author: book.author_name?.[0] ?? "Autor desconhecido",
            genre,
            urlImg: `${COVER_BASE}/${book.cover_i}-M.jpg`,
            source: "library", // identifica origem
          }))
      )
      .catch(() => []) // silencia erros individuais de gênero
  );

  const results = await Promise.all(requests);
  const books = results.flat();

  // Remove duplicatas por título
  const seen = new Set();
  return books.filter((b) => {
    const key = b.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Busca livros doados pela comunidade na API original.
 */
export async function fetchCommunityBooks() {
  try {
    const response = await axios.get(`${COMMUNITY_API}/livros`, {
      timeout: 8000,
    });
    return (response.data || []).map((item) => ({
      id: item.id,
      title: item.titulo,
      author: item.autor || "Autor desconhecido",
      genre: item.genero || "Gênero não informado",
      urlImg: item.imagem_url || FALLBACK_IMG,
      source: "community", // identifica origem
    }));
  } catch {
    return []; // API pode estar dormindo (Render free tier) — não bloqueia
  }
}

/**
 * Busca livros de ambas as fontes em paralelo e combina:
 * doações da comunidade primeiro (destaque), depois catálogo público.
 */
export async function fetchBooks() {
  const [communityBooks, publicBooks] = await Promise.allSettled([
    fetchCommunityBooks(),
    fetchPublicBooks(),
  ]);

  const community =
    communityBooks.status === "fulfilled" ? communityBooks.value : [];
  const library =
    publicBooks.status === "fulfilled" ? publicBooks.value : [];

  if (community.length === 0 && library.length === 0) {
    throw new Error(
      "Não foi possível carregar os livros. Verifique sua conexão."
    );
  }

  // Comunidade primeiro, biblioteca depois
  return [...community, ...library];
}

/**
 * Envia uma doação para a API da comunidade.
 */
export async function donateBook(bookData) {
  try {
    const response = await axios.post(`${COMMUNITY_API}/doar`, bookData, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Erro do servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Sem conexão com o servidor. Verifique sua internet.");
    } else {
      throw new Error("Erro inesperado ao enviar o livro.");
    }
  }
}
