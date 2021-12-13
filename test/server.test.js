const request = require('supertest')
const app = require('../server/routes.js')

describe('server endpoint: ', () => {
  test('GET / should respond with a 200 code', () => {
    return request(app).get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('TWO: GET / should respond with a 200 code', () => {
    return request(app).get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })
})
