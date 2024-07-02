const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3501;
require("dotenv");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
