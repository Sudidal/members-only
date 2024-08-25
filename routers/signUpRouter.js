import express from "express";
import signUpController from "../controller/signUpController.js";

const router = express.Router();

router.get("/", signUpController.signUpGet);

export { router as signUpRouter };
