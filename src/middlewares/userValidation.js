import * as yup from "yup";

async function userValidation(req, res, next) {
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
    age: yup.number().positive().integer().required(),
    cpf: yup.number().positive().integer().required()
  })

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request request cannot be empty"
    });
  }

  const schemaValid =  await schema.isValid(req.body);

  if (!schemaValid) {
    return res.status(400).json({ message: "Some field missing or invalid" });
  }
  
  
  return next();
}

export { userValidation };