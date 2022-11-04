const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
});

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
});

beforeEach( async () => {
  await request(server).post('/api/auth/register')
    .send({username: "Alex", password: "weallstayup"})
})

describe('[POST] /register', () => {
  test('adds a user to the database', async () => {
    const users = await db('users')
    expect(users).toHaveLength(1)
  })
  test('responds with a newly created user', async () => {
    const users = await db('users')
    expect(users[0].username).toEqual('Alex')
  })
})

describe('[POST] /login', () => {
  let login
  beforeEach( async () => {
    login = await request(server).post('/api/auth/login')
      .send({
        username: "Alex",
        password: "weallstayup"
      })
  })
  test('user is able to login successfully', async () => {
    expect(login.text).toMatch('token')
  })
  test('responds with a successful login message', async () => {
    expect(login.text).toMatch('welcome back, Alex')
  })
})

afterAll( async () => {
  await db.destroy()
});