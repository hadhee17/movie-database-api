import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)} // Navigate to details
      className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden 
                 hover:scale-105 hover:shadow-2xl transition-transform 
                 cursor-pointer group"
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-82 object-cover group-hover:opacity-90"
        />
        {/* Rating badge */}
        <div className="absolute bottom-2 right-2 bg-[#0f172a]/80 text-yellow-400 text-xs px-2 py-1 rounded">
          ⭐ {movie.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white truncate group-hover:text-primary">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-400">{movie.genres.join(", ")}</p>
        <p className="text-gray-500 text-xs mt-1">
          {new Date(movie.releaseDate).getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
