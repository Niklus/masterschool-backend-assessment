import express from "express";
import * as favoritesCtrl from "../controllers/favoritesController.js";
import auth from "../middleware/authMiddleware.js";

export const favoritesRouter = express.Router();

favoritesRouter
  .route("/")
  .post(auth, favoritesCtrl.addFavorite)
  .get(auth, favoritesCtrl.getFavorites);
favoritesRouter
  .route("/:id")
  .delete(auth, favoritesCtrl.deleteFavorite)
  .put(auth, favoritesCtrl.updateFavorite);
