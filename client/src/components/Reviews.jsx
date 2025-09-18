import { useEffect, useState } from "react";
import { getReviewsByMovie, addReview } from "../services/reviewServices";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [error, setError] = useState(""); // ✅ error state

  useEffect(() => {
    if (movieId) {
      getReviewsByMovie(movieId)
        .then(setReviews)
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const created = await addReview(movieId, {
        review: newReview,
        rating: newRating,
      });

      setReviews((prev) => [created, ...prev]);
      setNewReview("");
      setNewRating(5);
      setError(""); // ✅ clear error if success
    } catch (err) {
      // ✅ show backend message in UI
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>

      {/* ✅ Error message */}
      {error && <p className="mb-4 text-red-400 font-semibold">{error}</p>}

      {/* Review List */}
      <div className="space-y-4 mb-6">
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              className="p-4 bg-gray-800 rounded-lg shadow border border-gray-700"
            >
              <p className="text-gray-200">{r.review}</p>
              <p className="text-yellow-400 font-semibold">⭐ {r.rating}/5</p>
              <span className="text-sm text-gray-500">
                {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring focus:ring-primary focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <label className="text-white">Rating:</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="px-2 py-1 rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring focus:ring-primary focus:outline-none"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="ml-auto px-4 py-2 bg-primary text-dark font-semibold rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
