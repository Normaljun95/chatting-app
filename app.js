const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connected success"));

module.exports = app;