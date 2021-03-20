const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes');
const scraper = require('./utils/scraper');

dotenv.config();
const app = express();

// Basic Configuration
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Router
app.use(router);

const start = async () => {
  try {
    await mongoose.connection.on('connected', () => {
      console.log('mongoose connected');
    });
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // Parse task set at 10 am every day
    cron.schedule('0 10 * * *', () => {
      scraper();
      console.log('[schedule]: Parsed data');
    });

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
