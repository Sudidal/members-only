import queries from "../db/queries.js";
import process from "node:process";

class IndexController {
  constructor() {}

  async indexGet(req, res, next) {
    if (!req.user) {
      return res.redirect("/signin");
    } else if (req.user.membership_status !== true) {
      return res.redirect("getmembership");
    }
    const messages = await queries.getAllMessages(next);
    res.render("index", {
      user: req.user,
      posts: messages,
      admin: req.query.admin === process.env.ADMIN_CODE,
      adminCode: process.env.ADMIN_CODE,
    });
  }
}
const indexController = new IndexController();
export default indexController;
