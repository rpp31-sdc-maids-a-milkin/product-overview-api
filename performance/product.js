import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 200,
  duration: '30s'
}

export function setup () {
  console.log('DATE: ', new Date())
}

export default function () {
  const productId = Math.floor(Math.random() * (1000111 - 750000) + 750000)
  http.get(`http://127.0.0.1:3001/products/${productId}`)
  sleep(1)
}
