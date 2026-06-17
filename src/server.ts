import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

// Connect DB FIRST
connectDB();

app.listen(PORT, () => {
  console.log("╔════════════════════════════════════╗");
  console.log("║      StudyFlow AI Backend 🚀       ║");
  console.log("╚════════════════════════════════════╝");
  console.log(`Server running on port ${PORT}`);
});