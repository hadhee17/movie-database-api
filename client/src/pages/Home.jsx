import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import GenreStats from "../components/GenreStats";
import { getMovies, getGenreStats } from "../services/movieServices";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies).catch(console.error);
    getGenreStats().then(setGenres).catch(console.error);
  }, []);

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 w-full sm:w-1/2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
        />
        <div className="flex gap-2 flex-wrap">
          {["Action", "Thriller", "Drama", "Comedy"].map((genre) => (
            <button
              key={genre}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Genres */}
      <h2 className="text-2xl font-bold mb-4">Popular Genres</h2>
      <GenreStats genres={genres} />

      {/* All Movies */}
      <h2 className="text-2xl font-bold mt-10 mb-4">All Movies</h2>
      <MovieList movies={movies} />

      {/* Reviews Button */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600">
          See All Reviews
        </button>
      </div>
    </div>
  );
}

export default Home;
