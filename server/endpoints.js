const express = require('express')
const db = require('../db/db.js')
const app = express()

app.get('/', async function (req, res) {
  try {
    const result = await db.getProducts()
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ error })
  }
})

module.exports = app
