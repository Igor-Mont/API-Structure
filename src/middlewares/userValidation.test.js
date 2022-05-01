import request from "supertest";
import { app } from "../app.js";

describe('User Validation Middleware', () => {
  test('should return a bad request if no data is provided', async () => {
    const response = await request(app)
      .post('/users')
    
    expect(response.statusCode).toEqual(400) 
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if first_name no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        last_name: "any_last_name",
        email: 'any_email@mail.com',
        password: 'any_password',
        age: 18,
        cpf: 11111111111
      })
    
    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if last_name no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: "any_first_name",
        email: 'any_email@mail.com',
        password: 'any_password',
        age: 18,
        cpf: 11111111111
      })
    
    expect(response.statusCode).toEqual(400) 
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if password no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: "any_first_name",
        last_name: "any_last_name",
        email: 'any_email@mail.com',
        age: 18,
        cpf: 11111111111
      })
    
    expect(response.statusCode).toEqual(400) 
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if email no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: "any_first_name",
        last_name: "any_last_name",
        password: 'any_password',
        age: 18,
        cpf: 11111111111
      })
    
    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if age no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: "any_first_name",
        last_name: "any_last_name",
        email: 'any_email@mail.com',
        password: 'any_password',
        cpf: 11111111111
      })
    
    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('message')
  });

  test('should return a bad request if age no is provided or invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        first_name: "any_first_name",
        last_name: "any_last_name",
        email: 'any_email@mail.com',
        password: 'any_password',
        age: 18
      })
    
    expect(response.statusCode).toEqual(400) 
    expect(response.body).toHaveProperty('message')
  });
});