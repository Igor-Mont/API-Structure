import { User } from "../database/models/user.js";

async function showUsers(req, res) {

  const users = (await User.find()).map(user => {
    user.password = undefined
    return user
  });

  return res.status(200).json(users);
}

export { showUsers };