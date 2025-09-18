import api from "./api";

// Fetch reviews for a movie
export async function getReviewsByMovie(movieId) {
  const res = await api.get(`/review/get-review/${movieId}`);
  return res.data.data.review; // expects [{ text, createdAt, ... }]
}

// Add a review to a movie
export async function addReview(movieId, { review, rating }) {
  const res = await api.post(`/movies/${movieId}/create-review`, {
    review,
    rating,
  });

  return res.data.data.newReview;
}
