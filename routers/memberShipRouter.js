import express from "express";
import process from "node:process";
import queries from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const router = express.Router();

function get(req, res, next) {
  if (!req.user) return res.redirect("/");
  console.log(req.errorMessages);
  res.render("getMemberShip", {
    code: process.env.MEMBERSHIP_CODE,
    errorMessages: req.errorMessages,
  });
}

router.get("/", get);
router.get("/terms", (req, res, next) => {
  res.send(
    'You will be a good and polite person (˶ᵔ ᵕ ᵔ˶) <br> <a href="/getmembership">OK</a>'
  );
});
const validate = [
  body("agree")
    .custom((value) => {
      if (value === true || value === "on") return true;
      else return false;
    })
    .withMessage("You must accept our terms"),
  body("like")
    .custom((value) => {
      if (value === true || value === "on") return true;
      else return false;
    })
    .withMessage("You must like my fantastic project"),
  body("secret")
    .trim()
    .custom((value) => {
      if (value === process.env.MEMBERSHIP_CODE) return true;
      else return false;
    })
    .withMessage(
      "the code you entered is incorrect, have fun trying again 𓁹‿𓁹"
    ),
];

router.post("/", [
  validate,
  async (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      req.errorMessages = errs.array();
      return next();
    }
    await queries.updateMemberShip("true", req.user.user_id, next);
    res.redirect("/");
  },
  get,
]);

export { router as memberShipRouter };
