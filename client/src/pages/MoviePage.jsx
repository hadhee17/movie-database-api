import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieServices";
import Reviews from "../components/Reviews";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen text-gray-300 text-lg">
        Loading movie details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-[#1e293b] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        {/* Poster */}
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-72 md:w-80 rounded-2xl shadow-lg border border-gray-700"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>
          <p className="text-gray-350 mb-3">
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.join(", ")}
          </p>
          <p className="text-gray-300 text-sm mb-3">
            <span className="font-semibold">Release Date:</span>{" "}
            {new Date(movie.releaseDate).toDateString()}
          </p>
          <p className="text-yellow-400 font-bold mb-6 text-lg">
            ⭐ {movie.rating} / 10
          </p>
          <p className="text-gray-200 leading-relaxed">{movie.overview}</p>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition shadow-lg">
              ▶ Watch Trailer
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
              + Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews movieId={id} />
    </div>
  );
}

export default MoviePage;
