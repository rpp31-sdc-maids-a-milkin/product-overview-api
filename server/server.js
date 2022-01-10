// eslint-disable-next-line no-unused-vars
const newrelic = require('newrelic')
const app = require('./endpoints.js')

app.listen(3001, () => console.log('Listening on port 3001'))
