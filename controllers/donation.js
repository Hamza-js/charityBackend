const catchAcyncError = require("../middleware/catchAcyncError");
const Donation = require("../models/donationModel");

exports.donationController = catchAcyncError(async (req, res) => {
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
});

// Get all donations --Admin
exports.getAllDonations = catchAcyncError(async (req, res) => {
  try {
    const donations = await Donation.find();

    // Send the donations array to the client
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);

    // Send an error response to the client
    res
      .status(500)
      .json({ error: "An error occurred while retrieving donations." });
  }
});
