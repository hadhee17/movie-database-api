"use client";

import { useState } from "react";
import { searchMovies } from "../services/apiSearch"; // 👈 your backend API caller
import { FileText } from "lucide-react";

function SearchBars() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchMovies(value);
      setResults(data.results || []);
    } catch (err) {
      console.error("❌ Search failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* 🔍 Input */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search movies..."
        className="px-4 py-3 w-full rounded-xl 
          bg-[#1e293b] text-gray-200 
          border border-gray-700 
          focus:ring-2 focus:ring-primary focus:outline-none"
      />

      {/* ⏳ Loader */}
      {loading && (
        <p className="absolute top-full mt-2 text-sm text-gray-400">
          Searching...
        </p>
      )}

      {/* 📋 Results Dropdown */}
      {results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {results.map((movie) => (
            <li
              key={movie._id}
              className="flex items-start gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <FileText className="text-gray-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">{movie.title}</p>
                <p className="text-xs text-gray-500">
                  {movie.overview?.slice(0, 60)}...
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBars;
