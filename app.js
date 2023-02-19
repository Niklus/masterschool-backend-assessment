import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as routes from "./routes/index.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes.welcomeRouter);
app.use("/api/photos", routes.photoRouter);
app.use("/api/users", routes.userRouter);
app.use("/api/favorites", routes.favoritesRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
