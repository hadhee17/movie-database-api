const mongoose = require('mongoose');
const axios = require('axios');
const connectDB = require('../config/database');
const Movie = require('../models/movie');

const fetchDataFromApi = async () => {
  try {
    const allShows = [];
    for (let page = 0; page < 5; page++) {
      const response = await axios.get(
        `https://api.tvmaze.com/shows?page=${page}`,
      );
      allShows.push(...response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec delay
    }
    console.log(`Successfully fetched ${allShows.length} shows.`);
    return allShows;
  } catch (error) {
    console.log('Sorry, couldnt fetch data from API:', error.message);
    return null;
  }
};

const seedDataBase = async () => {
  try {
    // Connect ONCE
    await connectDB();

    // Fetch API data
    const shows = await fetchDataFromApi();
    if (!shows) return;

    // Clear old movies
    await Movie.deleteMany({});

    // Format data
    const formattedMovies = shows.map((show) => ({
      title: show.name,
      genres: show.genres || [],
      releaseDate: show.premiered ? new Date(show.premiered) : null,
      rating: show.rating?.average || 0,
      overview: show.summary
        ? show.summary.replace(/<[^>]*>?/gm, '')
        : 'No summary available.',
      imageUrl: show.image?.medium || null,
    }));

    // Insert into DB
    await Movie.insertMany(formattedMovies);
    console.log('Movies successfully seeded ✅');
  } catch (error) {
    console.log(`Error in seeding: ${error.message}`);
  } finally {
    console.log('Closing database connection');
    mongoose.connection.close();
  }
};

const deleteSeedData = async () => {
  try {
    await connectDB();
    await Movie.deleteMany({});
    console.log('Data successfully deleted from DB✅');
    process.exit();
  } catch (error) {
    console.log('Coudnt delete data from DB❌');
  }
};

if (process.argv[2] === '--export') {
  seedDataBase();
} else if (process.argv[2] === '--delete') {
  deleteSeedData();
}
