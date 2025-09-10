import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  console.log("Type of movies:", typeof movies);
  console.log("Is movies an array:", Array.isArray(movies));
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
