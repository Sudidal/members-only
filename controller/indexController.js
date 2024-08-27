import queries from "../db/queries.js";

class IndexController {
  constructor() {}

  async indexGet(req, res, next) {
    if (!req.user) {
      return res.redirect("/signin");
    }
    const messages = await queries.getAllMessages(next);
    res.render("index", { user: req.user, posts: messages });
  }
}
const indexController = new IndexController();
export default indexController;
