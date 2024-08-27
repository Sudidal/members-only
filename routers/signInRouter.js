import express from "express";
import signInController from "../controller/signInController.js";

const router = express.Router();

router.get("/", signInController.signInGet);
router.post("/", signInController.signInPost);

export { router as signInRouter };
