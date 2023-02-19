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

router.route("/user/:username").get(async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios({
      method: "get",
      url: `/users/${username}/photos`,
      baseURL,
      headers,
    });

    const data = response.data.map((obj) => {
      const {
        id,
        user: { username },
        urls: { raw },
        description,
      } = obj;
      return {
        id,
        username,
        description: description ?? "No description provided.",
        url: raw,
      };
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(error.response.status).json({
      message: error.message,
    });
  }
});

export default router;
