function GenreStats({ genres }) {
  if (!genres || !Array.isArray(genres)) {
    return null; // Or display a loading/error message
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {genres.map((g, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform"
        >
          <h3 className="text-lg font-semibold">{g.genre}</h3>
          <p className="text-gray-600">Movies: {g.movieCount}</p>
          <p className="text-yellow-500 font-bold">
            ⭐ {g.avgRating.toFixed(1)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GenreStats;
