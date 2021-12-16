const request = require('supertest')
const app = require('../server/endpoints.js')
const db = require('../db/db.js')

describe('endpoints: ', () => {
  test('GET / should respond with a 200 code', async () => {
    const tester = setupTest()
    const response = await tester.route('/')
    expect(response.statusCode).toBe(200)
  })

  test('TWO: GET / should respond with a 200 code', async () => {
    const tester = setupTest()
    const response = await tester.route('/')
    expect(response.statusCode).toBe(200)
  })
})

function setupTest () {
  const mocks = {}
  mocks.db = {}

  mocks.db.getProducts = []
  jest.spyOn(db, 'getProducts').mockImplementation(() => {
    return Promise.resolve(mocks.db.getProducts)
  })

  async function route (endpoint) {
    return await request(app).get(endpoint)
  }

  return { route, mocks }
}