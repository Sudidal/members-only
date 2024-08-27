import queries from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

class NewPostController {
  constructor() {}

  async newPostGet(req, res, next) {
    res.render("newPost");
  }
  newPost_Post = [
    validate,
    async (req, res, next) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        req.errorMessages = errs;
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
    .isLength({ min: 1, max: 30 })
    .withMessage("Post title must be between 1 and 30 characters"),
  body("text")
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Post title must be between 1 and 200 characters"),
];

const PostsController = new NewPostController();
export default PostsController;
