const { Client } = require('pg')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async (page = 1, count = 5) => {
  const client = new Client({ connectionString })
  client.connect()

  const offset = (page * count) - count
  const result = await client.query(`
    SELECT product_id, name, slogan, description, category,
    default_price, created_at, updated_at
    FROM products
    LIMIT ${count}
    OFFSET ${offset}
  `)

  client.end()
  return result.rows
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

  const styles = await client.query(`SELECT * FROM styles WHERE product_id = ${productId}`)
  for (let i = 0; i < styles.rows.length; i++) {
    const style = styles.rows[i]
    const styleId = style.style_id
    const skus = await client.query(`SELECT * FROM skus WHERE style_id = ${styleId}`)

    style.skus = skus.rows
  }

  client.end()
  return styles.rows
}

module.exports = {
  getProducts,
  getProduct,
  getStyles
}
