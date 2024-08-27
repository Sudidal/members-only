class SignOutController {
  constructor() {}

  signOutGet(req, res, next) {
    if (!req.user) return res.redirect("/signin");
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/signin");
    });
  }
}
const signOutController = new SignOutController();
export default signOutController;
