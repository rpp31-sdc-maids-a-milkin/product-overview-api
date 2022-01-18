const express = require('express')
const db = require('../db/db.js')
const app = express()

app.get('/products', async function (req, res) {
  try {
    const result = await db.getProducts(req.query.page, req.query.count)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ error })
  }
})

app.get('/products/:productId', async function (req, res) {
  try {
    const result = await db.getProduct(req.params.productId)
    if (result.length === 0) {
      res.status(500).send('Product does not exist')
    } else {
      res.status(200).send(result[0])
    }
  } catch (error) {
    res.status(500).send({ error })
  }
})

app.get('/products/:productId/styles', async function (req, res) {
  try {
    const result = await db.getStyles(req.params.productId)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ error })
  }
})

app.get('/loaderio-61e19fa9aa4f94252609c7d805c6479d', async function (req, res) {
  try {
    const token = 'loaderio-61e19fa9aa4f94252609c7d805c6479d'
    res.status(200).send(token)
  } catch (error) {
    res.status(500).send({ error })
  }
})

module.exports = app
