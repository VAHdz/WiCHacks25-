const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/customerInfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Mongoose Schema
const customerSchema = new mongoose.Schema({
    name: String,
    dob: String,
    email: String,
    bank: String,
    accountType: String,
    accountNumber: String,
    routingNumber: String,
    swift: String,
    destination: String,
    amount: String
});

const Customer = mongoose.model("Customer", customerSchema);

// Route to handle form submission
app.post("/submit", async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json({ message: "✅ Data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Error saving data" });
    }
});

// Start Server
app.listen(5001, () => console.log("🚀 Server running on port 5001"));
