const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config/.env' });

//connectDB
const DB = process.env.DATA_BASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log(`✅ MongoDB connected`);
  } catch (error) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
