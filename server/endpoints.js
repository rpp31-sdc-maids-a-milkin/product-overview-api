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
    res.status(200).send(result)
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

module.exports = app
