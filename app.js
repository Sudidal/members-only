import { config } from "dotenv";
config();
import express from "express";
import process from "node:process";
import session from "express-session";
import passport from "passport";
import connectPgSimple from "connect-pg-simple";
import passportConfig from "./passportConfig.js";
import pool from "./db/pool.js";
import { indexRouter } from "./routers/indexRouter.js";
import { signUpRouter } from "./routers/signUpRouter.js";
import { signInRouter } from "./routers/signInRouter.js";
import { signOutRouter } from "./routers/signOutRouter.js";
import { memberShipRouter } from "./routers/memberShipRouter.js";
import { postsRouter } from "./routers/postsRouter.js";

passportConfig();

const PORT = process.env.PORT;

const app = express();
const pgSession = connectPgSimple(session);

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, // 1000ms * 60s * 60m * 60h * 2d === 2 days
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", indexRouter);

app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);
app.use("/signout", signOutRouter);
app.use("/getmembership", memberShipRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () =>
  console.log(
    "Server listening at port: " +
      PORT +
      "\n\x1b[32m" +
      "http://localhost:" +
      PORT +
      "\x1b[0m \n"
  )
);
