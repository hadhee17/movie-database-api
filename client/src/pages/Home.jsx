import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import GenreStats from "../components/GenreStats";
import {
  getMovies,
  getGenreStats,
  getMoviesByGenre,
} from "../services/movieServices";
import SearchBar from "../components/searchBar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch initial data
    fetchInitialData();
  }, []);

  useEffect(() => {
    // Handle search when query changes
    if (searchQuery) {
      handleSearch(searchQuery);
    } else if (selectedGenre === "All") {
      getMovies().then(setMovies).catch(console.error);
    } else {
      handleGenreClick(selectedGenre);
    }
  }, [searchQuery, selectedGenre]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [moviesData, genresData] = await Promise.all([
        getMovies(),
        getGenreStats(),
      ]);
      setMovies(moviesData);
      setGenres(genresData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle genre selection
  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setSearchQuery(""); // Clear search when selecting a genre

    if (genre === "All") {
      getMovies().then(setMovies).catch(console.error);
    } else {
      getMoviesByGenre(genre).then(setMovies).catch(console.error);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      // If search is empty, revert to current genre filter
      if (selectedGenre === "All") {
        getMovies().then(setMovies).catch(console.error);
      } else {
        getMoviesByGenre(selectedGenre).then(setMovies).catch(console.error);
      }
      return;
    }

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="space-y-12 p-4 md:p-6">
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-slate-100 rounded-xl shadow-sm">
        <div className="w-full sm:w-1/2">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search movies by title..."
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
          {["All", "Action", "Thriller", "Drama", "Comedy"].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap
              ${
                selectedGenre === genre
                  ? "bg-amber-500 text-gray-900 scale-105 shadow-md"
                  : "bg-slate-700 text-white hover:bg-slate-600 hover:scale-105"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}

      {/* 📊 Popular Genres */}
      {!isLoading && !searchQuery && (
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-6">Popular Genres</h2>
          <GenreStats genres={genres} />
        </section>
      )}

      {/* 🎥 Movies */}
      {!isLoading && (
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-6">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedGenre && selectedGenre !== "All"
              ? `${selectedGenre} Movies`
              : "All Movies"}
            {movies.length > 0 && ` (${movies.length})`}
          </h2>

          {movies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery
                  ? `No movies found for "${searchQuery}"`
                  : "No movies available in this category"}
              </p>
            </div>
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      )}

      {/* ⭐ Reviews Button */}
      <div className="text-center pt-6">
        <button
          className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-xl shadow 
                           hover:bg-amber-400 transition transform hover:scale-105"
        >
          See All Reviews
        </button>
      </div>
    </div>
  );
}

export default Home;
