import { hash } from "bcrypt";
import { User } from "../database/models/user.js";

async function createUser(req, res) {
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

  const userAlreadyExists = await User.findOne({ email }).exec();

  if (!userAlreadyExists) return res.status(400).json({message: 'User already exists'})

  const user = await User.create(data)

  user.password = undefined

  return res.status(201).json(user)
}

export { createUser };