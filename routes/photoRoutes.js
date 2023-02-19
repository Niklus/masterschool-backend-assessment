import express from "express";
import * as photoCtrl from "../controllers/photoController.js";

export const photoRouter = express.Router();

photoRouter.get("/", photoCtrl.getPhotos);
photoRouter.get("/:id", photoCtrl.getPhoto);
photoRouter.get("/user/:username", photoCtrl.getUserPhotos);
