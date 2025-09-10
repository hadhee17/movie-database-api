import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">No movies found 🎬</div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
