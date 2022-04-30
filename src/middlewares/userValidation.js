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
    return res.status(400).send();
  }

  const schemaValid =  await schema.isValid(req.body);

  console.log('ERROR SCHEMA', schemaValid)

  if (!schemaValid) {
    return res.status(400).send({ error: schemaValid.err });
  }
  
  
  return next();
}

export { userValidation };