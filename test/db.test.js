const db = require('../db/db.js')
const sql = require('../db/sql.js')
const pg = require('pg')

jest.mock('pg', () => {
  const Client = jest.fn()
  return { Client }
})

describe('Database API Methods', () => {
  describe('getProducts', () => {
    test('should have been called with the correct default query', async () => {
      const tester = setupTest()
      const query = sql.products(1, 5)
      tester.mocks.client.query[query] = { rows: [] }
      await db.getProducts(1, 5)

      expect(tester.mocks.client.query).toHaveBeenCalledWith(query)
    })

    test('should have properly connected and disconnected from the database', async () => {
      const tester = setupTest()
      const query = sql.products(1, 5)
      tester.mocks.client.query[query] = { rows: [] }

      expect(tester.mocks.pg.Client).not.toHaveBeenCalled()
      expect(tester.mocks.client.connect).not.toHaveBeenCalled()
      expect(tester.mocks.client.end).not.toHaveBeenCalled()

      await db.getProducts(1, 5)

      expect(tester.mocks.pg.Client).toHaveBeenCalledWith({ connectionString: 'postgres://root:password@localhost:5432/atelier' })
      expect(tester.mocks.client.connect).toHaveBeenCalled()
      expect(tester.mocks.client.end).toHaveBeenCalled()
    })
  })

  describe('getProduct', () => {
    test('should have been called with the correct default query', async () => {
      const tester = setupTest()
      const query = sql.product(1)
      tester.mocks.client.query[query] = { rows: [{ product_id: 1 }] }
      await db.getProduct(1)

      expect(tester.mocks.client.query).toHaveBeenCalledWith(query)
    })

    test('should have properly connected and disconnected from the database', async () => {
      const tester = setupTest()
      const query = sql.product(1)
      tester.mocks.client.query[query] = { rows: [{ product_id: 1 }] }

      expect(tester.mocks.pg.Client).not.toHaveBeenCalled()
      expect(tester.mocks.client.connect).not.toHaveBeenCalled()
      expect(tester.mocks.client.end).not.toHaveBeenCalled()

      await db.getProduct(1)

      expect(tester.mocks.pg.Client).toHaveBeenCalledWith({ connectionString: 'postgres://root:password@localhost:5432/atelier' })
      expect(tester.mocks.client.connect).toHaveBeenCalled()
      expect(tester.mocks.client.end).toHaveBeenCalled()
    })
  })

  describe('getStyles', () => {
    test('should have been called with the correct default query', async () => {
      const tester = setupTest()
      const query = sql.styles(1)
      tester.mocks.client.query[query] = { rows: [] }
      await db.getStyles(1)

      expect(tester.mocks.client.query).toHaveBeenCalledWith(query)
    })

    test('should have properly connected and disconnected from the database', async () => {
      const tester = setupTest()
      const query = sql.styles(1)
      tester.mocks.client.query[query] = { rows: [] }

      expect(tester.mocks.pg.Client).not.toHaveBeenCalled()
      expect(tester.mocks.client.connect).not.toHaveBeenCalled()
      expect(tester.mocks.client.end).not.toHaveBeenCalled()

      await db.getStyles(1)

      expect(tester.mocks.pg.Client).toHaveBeenCalledWith({ connectionString: 'postgres://root:password@localhost:5432/atelier' })
      expect(tester.mocks.client.connect).toHaveBeenCalled()
      expect(tester.mocks.client.end).toHaveBeenCalled()
    })
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
