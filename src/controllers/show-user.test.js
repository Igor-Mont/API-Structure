import request from 'supertest';
import { app } from '../app.js';
import { MongoHelper } from "../database/mongo-helper.js";

describe('Show User Controller', () => {
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

  test('should not be able update an user if user is non-existent', async () => {
    const fakeObjectId = "627173a7fd28624b412e07b5"
    const response = await request(app).get(`/users/${fakeObjectId}`)

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message')
  });

  test('should not be able update an user if user is non-existent', async () => {
    const { body: user } = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    const response = await request(app).get(`/users/${user._id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).not.toHaveProperty('password')
  });
});