import {isValidBody, findAvatar} from "./utils.js";

const USERS_DB = [];
const TWEETS_DB = [];

const postSignUp = (req, res) => {
  const {body} = req;

  if (!isValidBody(body, ["username", "avatar"])) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    USERS_DB.push(body);
    res.status(201).send("OK");
  }
};

const postTweets = (req, res) => {
  const {body} = req;
  body.username = req.headers.user;

  if (!isValidBody(body, ["username", "tweet"])) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    TWEETS_DB.push(body);
    res.status(201).send("OK");
  }
};

const getTweets = (req, res) => {
  const lastTweets = TWEETS_DB.slice(-10);
  lastTweets.forEach(tweet => (tweet.avatar = findAvatar(tweet, USERS_DB)));
  res.send(lastTweets);
};

const getTweetsByUsername = (req, res) => {
  const {username} = req.params;

  const userTweets = TWEETS_DB.filter(tweet => tweet.username === username);
  if (userTweets.length !== 0) {
    const avatar = findAvatar(userTweets[0], USERS_DB);
    userTweets.forEach(tweet => (tweet.avatar = avatar));
  }
  res.send(userTweets);
};

const getTweetsByPage = (req, res) => {
  const {page} = req.query;
  const tweets = TWEETS_DB.slice((page - 1) * 10 + 1, page * 10);

  tweets.forEach(tweet => (tweet.avatar = findAvatar(tweet, USERS_DB)));
  res.send(tweets);
};

export {postSignUp, postTweets, getTweets, getTweetsByUsername, getTweetsByPage};
