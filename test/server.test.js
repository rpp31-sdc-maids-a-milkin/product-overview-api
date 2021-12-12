const request = require('supertest')
const app = require('../server/routes.js')
// const sum = require('../server/sum.js')

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3)
// })

describe('server endpoint: ', () => {
  test('GET / should respond with a 200 code', async () => {
    const response = await request(app).get('/')

    expect(response.statusCode).toBe(200)
  })
})
