const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const errorMiddleware = require("./middleware/error");
// const bodyParser = require("body-parser");
// const path = require("path");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

//Routs Import
const user = require("./routes/userRoute");
// const sendMail = require("./routes/sendMail");
app.use("/api/v1", user);
// app.use("/api/v1", sendMail);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

//Middleware for Error
// app.use(errorMiddleware);

module.exports = app;
