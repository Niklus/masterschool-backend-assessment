import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import photoRoutes from "./routes/photoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Unsplash API!",
  });
});

app.use("/api/photos", photoRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
