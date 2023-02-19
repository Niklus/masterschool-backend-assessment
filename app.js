import express from "express";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Routes
import photoRoutes from "./routes/photoRoutes.js";

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
