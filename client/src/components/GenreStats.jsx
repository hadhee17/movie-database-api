import { useNavigate } from "react-router-dom";

function GenreStats({ genres }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {genres.map((g, index) => (
        <div
          key={index}
          onClick={() => navigate(`/genre/${g.genre}`)} // Navigate to genre page
          className="bg-[#1e293b] p-6 rounded-2xl shadow-lg cursor-pointer 
                     hover:scale-105 hover:shadow-2xl transition-transform group"
        >
          {/* Genre Title */}
          <h3 className="text-xl font-semibold text-white group-hover:text-primary">
            {g.genre}
          </h3>

          {/* Stats */}
          <p className="text-gray-400 mt-2">Movies: {g.movieCount}</p>
          <p className="text-yellow-400 font-bold mt-1">
            ⭐ {g.avgRating.toFixed(1)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GenreStats;
