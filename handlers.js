import {isValidBody} from "./validations.js";

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
