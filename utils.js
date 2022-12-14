function isValidBody(body, fields) {
  if (typeof body !== "object") {
    return false;
  }

  const keys = Object.keys(body);
  if (fields.length !== keys.length) {
    return false;
  }

  for (const field of fields) {
    if (!keys.includes(field)) {
      return false;
    }

    if (typeof body[field] !== "string") {
      return false;
    }
  }

  return true;
}

function findAvatar(tweet, users) {
  return users.find(user => tweet.username === user.username)?.avatar ?? "NO AVATAR";
}
export {isValidBody, findAvatar};
