const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./services/connect");
dotenv.config();
const app = express();
const url = process.env.MONG_URI;

const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());
const login = require("./routes/login");
app.use("/login", login);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Express Server is Running!" });
});

// Start Server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

start();
