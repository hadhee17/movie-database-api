import api from "./api";

export async function getMovies() {
  const res = await api.get("/movies/all-movies");
  return res.data.data.doc;
}

export async function getGenreStats() {
  const res = await api.get("/movies/top-genres");
  return res.data.data.genres;
}
