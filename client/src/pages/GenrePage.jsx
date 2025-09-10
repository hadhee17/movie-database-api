import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../services/movieServices";
import MovieList from "../components/MovieList";

function GenrePage() {
  const { genreName } = useParams(); // 👈 grabs genre from URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(genreName);
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [genreName]);

  return (
    <div className="space-y-10">
      {/* 🎬 Hero Section */}
      <div className="bg-gradient-to-r from-dark to-[#1e293b] rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          {genreName} Movies
        </h1>
        <p className="text-gray-400 mt-2">
          Explore the best {genreName} movies, curated just for you 🎥
        </p>
      </div>

      {/* 🎥 Movies List */}
      <div className="px-4 sm:px-6">
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p className="text-center text-gray-400 py-10">
            No movies found in <span className="text-primary">{genreName}</span>
            .
          </p>
        )}
      </div>
    </div>
  );
}

export default GenrePage;
