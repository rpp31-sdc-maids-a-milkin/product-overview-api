import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 215,
  duration: '30s'
}

export function setup () {
  console.log('DATE: ', new Date())
}

export default function () {
  const page = Math.floor(Math.random() * (100011 - 50000) + 50000)
  const count = Math.floor(Math.random() * (10 - 5) + 5)
  http.get('http://127.0.0.1:3001/products', { params: { page, count } })
  sleep(1)
}
