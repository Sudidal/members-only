import passport from "passport";

class SignInController {
  constructor() {}

  signInGet(req, res, next) {
    console.log(req.session.messages);
    res.render("signInForm");
  }
  signInPost = [
    passport.authenticate("local", {
      failureMessage: true,
      successRedirect: "/",
      failureRedirect: "/signin",
    }),
  ];
}
const signInController = new SignInController();
export default signInController;
