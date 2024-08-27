import express from "express";
import newPostController from "../controller/newPostController.js";

const router = express.Router();

router.get("/", newPostController.newPostGet);
router.post("/", newPostController.newPost_Post);

export { router as newPostRouter };
