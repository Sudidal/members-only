import bcrypt from "bcryptjs";
import queries from "../db/queries.js";

class SignUpController {
  constructor() {}

  signUpGet(req, res, next) {
    res.render("signUpForm");
  }
  async signUpPost(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 0);
      console.log(hashedPassword);
      const values = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        userName: req.body.username,
        password: hashedPassword,
      };
      await queries.insertUser(values, next);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }
}

const signUpController = new SignUpController();
export default signUpController;
