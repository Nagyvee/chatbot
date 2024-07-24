const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3501;
require("dotenv").config();
const router = require('./routes/routes');

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://nayveechatbot.onrender.com/"],
    credentials: true,
  })
);

app.use('/api/', router)

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
