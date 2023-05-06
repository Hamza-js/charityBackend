const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const catchAcyncError = require("./middleware/catchAcyncError");
const nodemailer = require("nodemailer");
const Donation = require("./models/donationModel");
const cors = require("cors");
//config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routs Import
// const user = require("./routes/userRoute");
// app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("Welcom to Charity Backend");
});

app.post(
  "/sendMail",
  catchAcyncError(async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Create a nodemailer transport object with your email credentials
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hamza23.js@gmail.com",
          pass: "wrnwyjrvwcnormmc",
        },
      });

      // Define the email message
      const mailOptions = {
        from: `${email}`,
        to: "hamza23.js@gmail.com",
        subject: `New message from ${name} (${email})`,
        text: message,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send a success response to the client
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);

      // Send an error response to the client
      res
        .status(500)
        .json({ error: "An error occurred while sending the email." });
    }
  })
);

app.post(
  "/sendDonation",
  catchAcyncError(async (req, res) => {
    try {
      const { name, email, donation } = req.body;

      // Create a new donation object
      const newDonation = await Donation.create({
        name,
        email,
        donation,
      });

      // Save the donation object to the database
      await newDonation.save();

      // Send a success response to the client
      res.status(200).json({ message: "Donation saved successfully!" });
    } catch (error) {
      console.error(error);

      // Send an error response to the client
      res
        .status(500)
        .json({ error: "An error occurred while saving the donation." });
    }
  })
);

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
