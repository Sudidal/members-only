import express from "express";
import signUpController from "../controller/signUpController.js";

const router = express.Router();

router.get("/", signUpController.signUpGet);
router.post("/", signUpController.signUpPost);

export { router as signUpRouter };
