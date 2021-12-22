const { Client } = require('pg')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async () => {
  // create new client and open connection
  const client = new Client({ connectionString })
  client.connect()

  // save query results
  const result = await client.query('select * from products limit 0')
  client.end()

  return result.rows
}

const getProduct = async () => {
  const client = new Client({ connectionString })
  client.connect()

  const result = await client.query('select * from products limit 0')
  client.end()

  return result.rows
}

const getStyles = async () => {
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
