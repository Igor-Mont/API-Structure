import { User } from "../database/models/user.js";

async function deleteUser(req, res) {
  const { id } = req.params;

  const userAlreadyExists = await User.findById(id);

  if (!userAlreadyExists) return res.status(400).json({message: 'Non-existing user'})

  const deleted = await User.findOneAndDelete(id);

  if (!deleted) return res.status(400).json({message: 'Error on delete user'})

  return res.status(200).send()
}

export { deleteUser };