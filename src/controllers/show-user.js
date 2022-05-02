import { User } from "../database/models/user.js";

async function showUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id);

  if(!user) return res.status(400).json({message: 'Non-existing user'})

  user.password = undefined

  return res.status(200).json(user);
}

export { showUser };