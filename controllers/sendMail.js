const catchAcyncError = require("../middleware/catchAcyncError");
const nodemailer = require("nodemailer");

// Send to admin
exports.sendMail = catchAcyncError(async (req, res) => {
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
});
