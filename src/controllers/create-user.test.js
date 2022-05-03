import request from 'supertest';
import { app } from '../app.js';
import { MongoHelper } from "../database/mongo-helper.js";

describe('Create User Controller', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('users')

    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should be able create a new user', async () => {
    const response = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('_id')
  });

  test('should be able show the user without password', async () => {
    const response = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).not.toHaveProperty('password')
  });

  test('should not be able create a new user if user already exists', async () => {
    await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })
    const response = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message')
  });
});