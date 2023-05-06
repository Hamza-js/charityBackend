const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());

//Routs Import
const user = require("./routes/userRoute");
app.use("/api/v1", user);

//Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught exception");
  process.exit(1);
});
//config
dotenv.config({ path: "config/config.env" });

//connecting to DataBase
connectDatabase();

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close();
  process.exit(1);
});

module.exports = app;
