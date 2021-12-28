const { Client } = require('pg')
const sql = require('./sql.js')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async (page = 1, count = 5) => {
  const client = new Client({ connectionString })
  client.connect()

  const result = await client.query(sql.products(page, count))

  client.end()
  return result.rows
}

const getProduct = async (productId = 1) => {
  const client = new Client({ connectionString })
  client.connect()

  const result = await client.query(sql.product(productId))

  client.end()
  return result.rows
}

const getStyles = async (productId = 1) => {
  const client = new Client({ connectionString })
  client.connect()

  const styles = await client.query(sql.styles(productId))
  for (let i = 0; i < styles.rows.length; i++) {
    const style = styles.rows[i]
    const styleId = style.style_id
    const skus = await client.query(sql.skus(styleId))

    style.skus = skus.rows
  }

  client.end()
  return styles.rows
}

module.exports = {
  sql,
  getProducts,
  getProduct,
  getStyles
}
