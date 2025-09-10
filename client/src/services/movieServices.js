import api from "./api";

export async function getMovies() {
  const res = await api.get("/movies/all-movies");
  return res.data.data.doc;
}

export async function getGenreStats() {
  const res = await api.get("/movies/top-genres");
  return res.data.data.genres;
}

export async function getMoviesByGenre(genre) {
  const res = await api.get(`/movies/get-by-genre/${genre}`);
  return res.data.data.movies;
}

export async function getMovieById(id) {
  const res = await api.get(`/movies/movie/${id}`);
  return res.data.data.doc; // adjust based on backend response
}
