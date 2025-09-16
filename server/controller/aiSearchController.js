const { Search } = require('@upstash/search');
const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

const client = new Search({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_TOKEN,
});

const index = client.index('main');

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;

    // Step 1: Search in Upstash
    const results = await index.search({
      query,
      limit: 5,
    });

    console.log('🔎 Upstash raw search results:', results);

    const hits = results.results || results;
    if (!hits || hits.length === 0) return res.json({ results: [] });

    // Step 2: Use MongoDB ID stored inside content
    const ids = hits.map((hit) => hit.content.id); // <---
    // MongoDB _id here
    console.log(
      'Content IDs from Upstash:',
      hits.map((hit) => hit.content.id),
    );

    console.log('🆔 MongoDB IDs extracted from Upstash hits:', ids);
    const objectIds = ids.map((id) => mongoose.Types.ObjectId(id));

    const movies = await Movie.find({ _id: { $in: objectIds } });

    // Step 4: Preserve Upstash ranking order
    const orderedMovies = ids
      .map((id) => movies.find((m) => m._id.toString() === id))
      .filter(Boolean);

    res.json({ results: orderedMovies });
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
