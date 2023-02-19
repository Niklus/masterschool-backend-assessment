import express from "express";
import {
  getPhotos,
  getPhoto,
  getUserPhotos,
} from "../controllers/photoController.js";

const router = express.Router();

router.route("/").get(getPhotos);
router.route("/:id").get(getPhoto);
router.route("/user/:username").get(getUserPhotos);

export default router;
