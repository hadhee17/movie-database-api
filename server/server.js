const dotenv = require('dotenv');
const connectDB = require('./config/database');
const app = require('./app');

dotenv.config({ path: './config/.env' });

const port = process.env.PORT || 8000;

const connection = async () => {
  await connectDB();
};
connection();

app.listen(port, () => console.log(`App running in port:${port}`));
