/* eslint-disable camelcase */
require('dotenv').config()
const { Pool } = require('pg')
const sql = require('./sql.js')

// config string
const connectionString = process.env.POSTGRES_URL
const max = 100

const pool = new Pool({ connectionString, max })

/* DB API */
const getProducts = async (page = 1, count = 5) => {
  const client = await pool.connect()
  const result = await client.query(sql.products(page, count))
  client.release()

  // change product_id to id and add campus
  for (let i = 0; i < result.rows.length; i++) {
    const product = result.rows[i]
    const id = product.product_id
    delete product.product_id
    product.id = id
    product.campus = 'hr-rpp'
  }

  return result.rows
}

const getProduct = async (productId = 1) => {
  const client = await pool.connect()
  const result = await client.query(sql.product(productId))
  client.release()

  // change product_id to id and add campus
  const product = result.rows[0]
  const id = product.product_id
  delete product.product_id
  product.id = id
  product.campus = 'hr-rpp'

  return result.rows
}

const getStyles = async (productId = 1) => {
  const client = await pool.connect()
  const { rows } = await client.query(sql.styles(productId))
  client.release()

  const styles = []
  const addedStyles = {}
  let styleIndex = 0

  for (let i = 0; i < rows.length; i++) {
    const sku = rows[i]
    const { style_id, name, sale_price, original_price, default_style, photos, sku_id, size, quantity } = sku

    if (addedStyles[style_id] === undefined) {
      addedStyles[style_id] = styleIndex
      styleIndex++
      styles.push(
        {
          style_id,
          name,
          original_price,
          sale_price,
          'default?': default_style,
          photos,
          skus: {}
        }
      )
    }

    const currStyleIndex = addedStyles[style_id]
    styles[currStyleIndex].skus[sku_id] = { quantity, size }
  }

  return { product_id: productId, results: styles }
}

module.exports = {
  sql,
  getProducts,
  getProduct,
  getStyles
}
