const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const PORT = 3501;
require("dotenv").config();
const router = require('./routes/routes');
const {  deletePreviousImages} = require('./controllers/controllers');
const cron = require('node-cron');

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatbot.nayveetech.co.za"],
    credentials: true,
  })
);

app.use('/api/', router);

// Schedule the task to run every day at 00:00
cron.schedule('0 0 * * *', () => {
  console.log('Running daily deletion task...');
  deletePreviousImages();
});

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
