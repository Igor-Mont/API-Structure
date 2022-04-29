import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  cpf: {
    type: Number,
    unique: true,
    required: true
  }
});

const User = mongoose.model('User', Schema);

export { User };