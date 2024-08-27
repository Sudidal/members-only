import express from "express";
import signOutController from "../controller/signOutController.js";

const router = express.Router();

router.get("/", signOutController.signOutGet);

export { router as signOutRouter };
