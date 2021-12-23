const { Client } = require('pg')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async (page = 1, count = 5) => {
  try {
    const client = new Client({ connectionString })
    client.connect()
    const offset = (page * count) - count
    const result = await client.query(
      `SELECT product_id, name, slogan, description, category, default_price, created_at, updated_at FROM products LIMIT ${count} OFFSET ${offset}`
    )
    client.end()

    return result.rows
  } catch (error) {
    throw Error
  }
}

const getProduct = async (productId) => {
  const client = new Client({ connectionString })
  client.connect()
  const result = await client.query(`SELECT * FROM products WHERE product_id = ${productId}`)
  client.end()

  return result.rows
}

const getStyles = async (productId) => {
  const client = new Client({ connectionString })
  client.connect()
  const result = await client.query('select * from styles limit 0')
  client.end()

  return result.rows
}

module.exports = {
  getProducts,
  getProduct,
  getStyles
}
