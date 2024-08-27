import passport from "passport";

class SignInController {
  constructor() {}

  signInGet(req, res, next) {
    if (req.user) return res.redirect("/");
    console.log(req.session.messages);
    res.render("signInForm", {
      errorMessages:
        req.session?.messages?.length > 0
          ? [req.session.messages[req.session.messages.length - 1]]
          : null,
    });
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
