import {isValidBody, findAvatar} from "./utils.js";

const USERS_DB = [];
const TWEETS_DB = [];

const postSignUp = (req, res) => {
  const {body} = req;

  if (!isValidBody(body, ["username", "avatar"])) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    USERS_DB.push({
      ...req.body,
      id: USERS_DB.length + 1,
    });
    res.status(201).send("OK");
  }
};

const postTweets = (req, res) => {
  const {body} = req;
  body.username = req.headers.user;

  if (!isValidBody(body, ["username", "tweet"])) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    TWEETS_DB.push({
      ...req.body,
      id: TWEETS_DB.length + 1,
    });
    res.status(201).send("OK");
  }
};

const getTweets = (req, res) => {
  const lastTweets = TWEETS_DB.slice(-10);
  lastTweets.forEach(tweet => (tweet.avatar = findAvatar(tweet, USERS_DB)));

  res.send(lastTweets);
};

const getTweetsByUsername = (req, res) => {};

const getTweetsByPage = (req, res) => {};

export {postSignUp, postTweets, getTweets, getTweetsByUsername, getTweetsByPage};
