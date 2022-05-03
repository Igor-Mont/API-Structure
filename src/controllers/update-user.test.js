import request from 'supertest';
import { app } from '../app.js';
import { MongoHelper } from "../database/mongo-helper.js";

describe('Update User Controller', () => {
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

  test('should be able update an user', async () => {
    const { body: user } = await request(app).post('/users').send({
      first_name: "any_first_name",
      last_name: "any_last_name",
      email: 'any_email@mail.com',
      password: 'any_password',
      age: 18,
      cpf: 11111111111
    })

    const response = await request(app).patch(`/users/${user._id}`).send({
      first_name: "new_first_name",
      last_name: "new_last_name",
      email: 'new_mail@mail.com',
      password: 'new_pass',
      age: 17,
      cpf: 2222222
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.first_name).toBe('new_first_name')
    expect(response.body.last_name).toBe('new_last_name')
    expect(response.body.email).toBe('new_mail@mail.com')
    expect(response.body.password).not.toBe('new_pass')
  });

  test('should not be able update an user if user is non-existent', async () => {
    const fakeObjectId = "627173a7fd28624b412e07b5"
    const response = await request(app).patch(`/users/${fakeObjectId}`).send({
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