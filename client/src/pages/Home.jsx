import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import GenreStats from "../components/GenreStats";
import {
  getMovies,
  getGenreStats,
  getMoviesByGenre,
} from "../services/movieServices";

function Home() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]); // ✅ keep all for search
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    setLoading(true);
    Promise.all([getMovies(), getGenreStats()])
      .then(([movieData, genreData]) => {
        setMovies(movieData);
        setAllMovies(movieData);
        setGenres(genreData);
      })
      .catch(console.error)
      .finally(() => setLoading(false)); // ✅ stop loading after fetching
  }, []);

  // ✅ Handle genre selection
  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setLoading(true);

    try {
      if (genre === "All") {
        const data = await getMovies();
        setMovies(data);
        setAllMovies(data);
      } else {
        const data = await getMoviesByGenre(genre);
        setMovies(data);
        setAllMovies(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle search (case-insensitive)
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(filtered);
    }
  };

  return (
    <div className="space-y-12">
      {/* 🎬 Hero Section */}
      <div className="relative rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-dark/70 to-[#1e293b]"></div>
        <div className="relative p-10 sm:p-16 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Discover Your Next Favorite Movie 🍿
          </h1>
          <p className="text-gray-200 max-w-2xl leading-relaxed drop-shadow">
            Explore thousands of movies by genre, ratings, and popularity. Stay
            entertained with the latest releases and timeless classics.
          </p>
        </div>
      </div>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search movies..."
          className="px-4 py-3 w-full sm:w-1/2 rounded-xl 
                     bg-[#1e293b] text-gray-200 
                     border border-gray-700 
                     focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          {["All", "Action", "Thriller", "Drama", "Comedy"].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 rounded-full font-medium transition transform
                ${
                  selectedGenre === genre
                    ? "bg-primary text-dark scale-105 shadow-lg"
                    : "bg-secondary/80 text-white hover:bg-secondary"
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 📊 Popular Genres → hidden when searching */}
      {!searchQuery && !loading && (
        <section>
          <h2 className="text-2xl font-bold text-black mb-6">Popular Genres</h2>
          <GenreStats genres={genres} />
        </section>
      )}

      {/* 🎥 Movies */}
      <section>
        <h2 className="text-2xl font-bold text-black mb-6">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedGenre && selectedGenre !== "All"
            ? `${selectedGenre} Movies`
            : "All Movies"}
        </h2>

        {/* 🌀 Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-500 text-lg font-medium">
            Loading movies...
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </section>
    </div>
  );
}

export default Home;
