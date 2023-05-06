const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

//config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());

//Routs Import
const user = require("./routes/userRoute");
app.use("/api/v1", user);

module.exports = app;
