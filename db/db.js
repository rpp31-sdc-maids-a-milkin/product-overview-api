const { Client } = require('pg')

// config string
const connectionString = 'postgres://root:password@localhost:5432/atelier'

/* DB API */
const getProducts = async () => {
  // create new client and open connection
  const client = new Client({ connectionString })
  client.connect()

  // save query results
  const result = await client.query('SELECT * from product_info')
  client.end()

  return result.rows
}

module.exports = {
  getProducts
}
