import bcrypt from "bcryptjs";
import queries from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

class SignUpController {
  constructor() {}

  signUpGet(req, res, next) {
    if (req.user) return res.redirect("/");
    console.log(req.body.errorMessages);
    res.render("signUpForm", { errorMessages: req.body.errorMessages });
  }
  signUpPost = [
    validateUser,
    async (req, res, next) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        req.body.errorMessages = errs.array();
        return next();
      }
      try {
        const data = matchedData(req);
        console.log(data);
        const hashedPassword = await bcrypt.hash(data.password, 0);
        console.log(hashedPassword);
        const values = {
          firstName: data.first_name,
          lastName: data.last_name,
          userName: data.username,
          password: hashedPassword,
        };
        await queries.addUser(values, next);
        res.redirect("/signin");
      } catch (err) {
        return next(err);
      }
    },
    this.signUpGet,
  ];
}

const validateUser = [
  body("first_name")
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .withMessage("First name must be between 1 and 20 characters"),
  body("last_name")
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .withMessage("Last name must be between 1 and 20 characters"),
  body("username")
    .isString()
    .isLength({ min: 1, max: 20 })
    .trim()
    .withMessage("Username must be between 1 and 20 characters"),
  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty"),
  body("confirm_password")
    .isString()
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (req.body.password === req.body.confirm_password) return true;
      else return false;
    })
    .withMessage("passwords do not match"),
];

const signUpController = new SignUpController();
export default signUpController;
