const { Client } = require('pg')
const sql = require('./sql.js')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async (page = 1, count = 5) => {
  const client = new Client({ connectionString })
  client.connect()

  const result = await client.query(sql.products(page, count))

  // change product_id to id and add campus
  for (let i = 0; i < result.rows.length; i++) {
    const product = result.rows[i]
    const id = product.product_id
    delete product.product_id
    product.id = id
    product.campus = 'hr-rpp'
  }

  client.end()
  return result.rows
}

const getProduct = async (productId = 1) => {
  const client = new Client({ connectionString })
  client.connect()

  const result = await client.query(sql.product(productId))
  // change product_id to id and add campus
  const product = result.rows[0]
  const id = product.product_id
  delete product.product_id
  product.id = id
  product.campus = 'hr-rpp'

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
    const defStyle = style.default_style
    style['default?'] = !!(defStyle)

    delete style.product_id
    delete style.default_style

    const skus = await client.query(sql.skus(styleId))

    style.skus = skus.rows
  }
  client.end()
  return { product_id: productId, results: styles.rows }
}

module.exports = {
  sql,
  getProducts,
  getProduct,
  getStyles
}
