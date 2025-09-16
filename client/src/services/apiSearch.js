// searchService.js
export async function searchMovies(query) {
  try {
    const response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Search request failed");
    }

    return await response.json(); // returns { results: [...] }
  } catch (error) {
    console.error("❌ Search error:", error.message);
    return { results: [] };
  }
}
