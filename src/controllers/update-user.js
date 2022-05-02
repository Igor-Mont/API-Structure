import { hash } from "bcrypt";
import { User } from "../database/models/user.js";

async function updateUser(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, password, cpf, age } = req.body;

  const hashPassword = await hash(password, 12);

  const data = {
    first_name,
    last_name,
    email,
    password: hashPassword,
    age,
    cpf
  }

  const userAlreadyExists = await User.findById(id);

  if(!userAlreadyExists) return res.status(400).json({message: 'Non-existing user'})

  const user = await User.findOneAndUpdate(id, data, { new: true });

  user.password = undefined

  return res.status(200).json(user);
}

export { updateUser };