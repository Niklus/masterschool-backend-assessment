import express from "express";

export const welcomeRouter = express.Router();

welcomeRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Unsplash API!",
  });
});
