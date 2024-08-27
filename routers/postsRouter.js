import express from "express";
import PostsController from "../controller/PostsController.js";

const router = express.Router();

router.get("/new", PostsController.newPostGet);
router.post("/new", PostsController.newPost_Post);
router.get("/delete/:postId", PostsController.deletePostGet);

export { router as postsRouter };
