import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const baseURL = "https://api.unsplash.com/";

const { UNSPLASH_ACCESS_KEY } = process.env;

const headers = {
  Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
};

router.route("/").get(async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "/photos",
      baseURL,
      headers,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `/photos/${id}`,
      baseURL,
      headers,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
