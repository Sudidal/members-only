class SignUpController {
  constructor() {}

  signUpGet(req, res, next) {
    res.render("signUpForm");
  }
}

const signUpController = new SignUpController();
export default signUpController;
