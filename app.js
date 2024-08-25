import express from "express";
import process from "node:process";
import { config } from "dotenv";
import { signUpRouter } from "./routers/signUpRouter.js";

config();

const PORT = process.env.PORT;

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("alhamdullilah, the server is working");
});
app.use("/signup", signUpRouter);

app.listen(PORT, () =>
  console.log(
    "Server listening at port: " +
      PORT +
      "\n\x1b[32m" +
      "http://localhost:" +
      PORT +
      "\x1b[0m"
  )
);
