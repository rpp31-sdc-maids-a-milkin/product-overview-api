const db = require('../db/db.js')
const pg = require('pg')

jest.mock('pg', () => {
  const Client = jest.fn()
  return { Client }
})

describe('db', () => {
  test('getProducts', async () => {
    const tester = setupTest()
    const query = 'SELECT * from product_info'
    tester.mocks.client.query[query] = { rows: [] }

    expect(tester.mocks.pg.Client).not.toHaveBeenCalled()
    expect(tester.mocks.client.connect).not.toHaveBeenCalled()
    expect(tester.mocks.client.query).not.toHaveBeenCalled()
    expect(tester.mocks.client.end).not.toHaveBeenCalled()

    const result = await db.getProducts()
    expect(result).toEqual([])

    expect(tester.mocks.pg.Client).toHaveBeenCalledWith({ connectionString: 'postgres://root:password@localhost:5432/atelier' })
    expect(tester.mocks.client.connect).toHaveBeenCalled()
    expect(tester.mocks.client.query).toHaveBeenCalledWith(query)
    expect(tester.mocks.client.end).toHaveBeenCalled()
  })
})

function setupTest () {
  const mocks = {}

  mocks.client = {}
  mocks.client.connect = jest.fn()
  mocks.client.end = jest.fn()
  mocks.client.query = jest.fn().mockImplementation((query) => {
    return Promise.resolve(mocks.client.query[query])
  })

  mocks.pg = {}
  mocks.pg.Client = jest.fn().mockImplementation((config) => {
    return mocks.client
  })

  jest.spyOn(pg, 'Client').mockImplementation(mocks.pg.Client)

  return { mocks }
}
