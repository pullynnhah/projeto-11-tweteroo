import express from "express";
import cors from "cors";

import {
  postSignUp,
  postTweets,
  getTweets,
  getTweetsByUsername,
  getTweetsByPage,
} from "./handlers.js";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/sign-up", postSignUp);
app.post("/tweets", postTweets);
app.get("/tweets", getTweets);
app.get("/tweets/:username", getTweetsByUsername);
app.get("tweets/:page", getTweetsByPage);

app.listen(port, () => console.log(`Magic happens on PORT=${port}...`));
