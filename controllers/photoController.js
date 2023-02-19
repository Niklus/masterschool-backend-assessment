import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const baseURL = "https://api.unsplash.com/";

const { UNSPLASH_ACCESS_KEY } = process.env;

const headers = {
  Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
};

// @desc Get Photos
// @route GET /api/photos/
// @access Public
const getPhotos = async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "/photos",
      baseURL,
      headers,
    });
    res.status(200).json(response.data);
  } catch (error) {
    handleErrors(error, res);
  }
};

// @desc Get Photo
// @route GET /api/photos/:id
// @access Public
const getPhoto = async (req, res) => {
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
    handleErrors(error, res);
  }
};

// @desc Get User Photos
// @route GET /api/photos/user/:username
// @access Public
const getUserPhotos = async (req, res) => {
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
    handleErrors(error, res);
  }
};

const handleErrors = (error, res) => {
  const status = error.response?.status ?? 500;

  status === 404
    ? res.status(status).json({ message: "Not Found." })
    : status === 500
    ? res.status(status).json({
        message: "Server error. Please try again later.",
      })
    : res.status(status).json({ message: error.message });
};

export { getPhotos, getPhoto, getUserPhotos };
