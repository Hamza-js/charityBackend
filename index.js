const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

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
