import queries from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

class NewPostController {
  constructor() {}

  async newPostGet(req, res, next) {
    res.render("newPost", { errorMessages: req.errorMessages });
  }
  newPost_Post = [
    validate,
    async (req, res, next) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        req.errorMessages = errs.array();
        return next();
      }
      const data = matchedData(req);
      const values = {
        title: data.title,
        text: data.text,
        timestamp: new Date().toUTCString(),
        user_id: req.user.user_id,
      };
      await queries.addMessage(values, next);
      res.redirect("/");
    },
    this.newPostGet,
  ];

  async deletePostGet(req, res, next) {
    await queries.deleteMessage(req.params.postId, next);
    res.redirect("/");
  }
}

const validate = [
  body("title")
    .isString()
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage("Post title must be between 1 and 80 characters"),
  body("text")
    .isString()
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage("Post title must be between 1 and 300 characters"),
];

const PostsController = new NewPostController();
export default PostsController;
