import axios from "axios";

// @desc Get Photos
// @route GET /api/photos/
// @access Public
export const getPhotos = async (req, res) => {
  try {
    const response = await getData("/photos");
    res.status(200).json(response.data);
  } catch (error) {
    handleErrors(error, res);
  }
};

// @desc Get Photo
// @route GET /api/photos/:id
// @access Public
export const getPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getData(`/photos/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    handleErrors(error, res);
  }
};

// @desc Get User Photos
// @route GET /api/photos/user/:username
// @access Public
export const getUserPhotos = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await getData(`/users/${username}/photos`);

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

// Get Data Helper
const getData = (url) => {
  return axios({
    method: "get",
    url,
    baseURL: "https://api.unsplash.com/",
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });
};

// Error handler helper
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
