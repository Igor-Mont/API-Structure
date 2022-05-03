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
    const { body: user } = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    const response = await request(app).delete(`/users/${user._id}`)

    expect(response.statusCode).toBe(200)
  });

  test('should not be able delete an user if user is non-existent', async () => {
    const nonExistentId = "627173a7fd28624b412e07b5"
    const response = await request(app).delete(`/users/${nonExistentId}`)

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message')
  });
});