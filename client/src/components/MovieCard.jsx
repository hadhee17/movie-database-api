function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.genres.join(", ")}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-yellow-500 font-bold">⭐ {movie.rating}</span>
          <span className="text-gray-400 text-sm">
            {new Date(movie.releaseDate).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
