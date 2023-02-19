import FavoritePhoto from "../models/favoritePhotoModel.js";
import asyncHandler from "express-async-handler";

// @desc Add Photo
// @route POST /api/favorite
// @access Private
export const addFavorite = asyncHandler(async (req, res) => {
  const { url, description, username, explanation = null } = req.body;

  if (!url || !description || !username) {
    res.status(400);
    throw new Error("Please provide the required fields");
  }

  const favoritePhoto = await FavoritePhoto.create({
    user: req.user.id,
    url,
    description,
    username,
    explanation,
  });
  res.status(201).json(favoritePhoto);
});

// @desc Get favorites
// @route GET /api/favorites
// @access Private
export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await FavoritePhoto.find({ user: req.user.id });
  res.status(200).json(favorites);
});

// @desc Delete Favorite
// @route DELETE /api/favorites/:id
// @access Private
export const deleteFavorite = asyncHandler(async (req, res) => {
  const favoritePhoto = await FavoritePhoto.find({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!favoritePhoto.length) {
    res.status(400);
    throw new Error("Photo not found");
  } else {
    await FavoritePhoto.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ _id: req.params.id });
  }
});

// @desc Update Favorite
// @route PUT /api/favorites/:id
// @access Private
export const updateFavorite = asyncHandler(async (req, res) => {
  const favoritePhoto = await FavoritePhoto.find({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!favoritePhoto.length) {
    res.status(400);
    throw new Error("Photo not found");
  } else {
    await FavoritePhoto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ _id: req.params.id });
  }
});
