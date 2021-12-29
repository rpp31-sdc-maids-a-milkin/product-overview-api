const axios = require('axios')

const randomProductId = Math.floor(Math.random() * (1000011 - 1) + 1)
const randomProductUrl = `http://localhost:3001/products/${randomProductId}`
const randomStylesUrl = `http://localhost:3001/products/${randomProductId}/styles`

describe('Endpoints', () => {
  describe('/products', () => {
    test('should respond with a 200 code', () => {
      axios.get('http://localhost:3001/products')
        .then((response) => {
          expect(response.status).toBe(200)
        })
    })

    test('should return 5 products by default starting at product 1', () => {
      axios.get('http://localhost:3001/products')
        .then((response) => {
          expect(response.data[0].product_id).toBe(1)
          expect(response.data.length).toBe(5)
        })
    })

    test('should return number of products based on count and page inputs', () => {
      axios.get('http://localhost:3001/products', {
        params: {
          page: 3,
          count: 10
        }
      })
        .then((response) => {
          expect(response.data[0].product_id).toBe(21)
          expect(response.data.length).toBe(10)
        })
    })

    test('should return products with the correct properties', () => {
      axios.get('http://localhost:3001/products', {
        params: {
          page: 1,
          count: 1
        }
      })
        .then((response) => {
          const product = response.data[0]
          expect(product).toHaveProperty('product_id')
          expect(product).toHaveProperty('name')
          expect(product).toHaveProperty('slogan')
          expect(product).toHaveProperty('description')
          expect(product).toHaveProperty('category')
          expect(product).toHaveProperty('default_price')
          expect(product).toHaveProperty('created_at')
          expect(product).toHaveProperty('updated_at')
        })
    })

    test('should respond with a 500 code with invalid params', () => {
      axios.get('http://localhost:3001/products', {
        params: {
          page: 0,
          count: 5
        }
      })
        .catch((error) => {
          expect(error.response.status).toBe(500)
        })
    })
  })

  describe('/products/:productId', () => {
    test('should respond with a 200 code', () => {
      axios.get(randomProductUrl)
        .then((response) => {
          expect(response.status).toBe(200)
        })
    })

    test('should return 1 product', () => {
      axios.get(randomProductUrl)
        .then((response) => {
          expect(response.data.length).toBe(1)
        })
    })

    test('should return product matching input productId', () => {
      axios.get(randomProductUrl)
        .then((response) => {
          const product = response.data[0]
          const expectedId = parseInt(response.config.url.split('/')[4], 10)
          expect(product.product_id).toBe(expectedId)
        })
    })

    test('should return a product with the correct properties', () => {
      axios.get(randomProductUrl)
        .then((response) => {
          const product = response.data[0]
          expect(product).toHaveProperty('product_id')
          expect(product).toHaveProperty('name')
          expect(product).toHaveProperty('slogan')
          expect(product).toHaveProperty('description')
          expect(product).toHaveProperty('category')
          expect(product).toHaveProperty('default_price')
          expect(product).toHaveProperty('features')
          expect(product).toHaveProperty('created_at')
          expect(product).toHaveProperty('updated_at')
        })
    })

    test('should respond with a 500 code with invalid productId', () => {
      axios.get('http://localhost:3001/products/2000011')
        .catch((error) => {
          expect(error.response.status).toBe(500)
        })
    })
  })

  describe('/products/:productId/styles', () => {
    test('should respond with a 200 code', async () => {
      const response = await axios.get(randomStylesUrl)
      expect(response.status).toBe(200)
    })

    test('should return styles matching input productId', async () => {
      const response = await axios.get(randomStylesUrl)
      const styles = response.data

      if (styles.length === 0) {
        expect(styles.length).toBe(0)
      } else {
        const expectedId = parseInt(response.config.url.split('/')[4], 10)

        for (let i = 0; i < styles.length; i++) {
          const productId = styles[i].product_id
          expect(productId).toBe(expectedId)
        }
      }
    })

    test('should return styles with the correct properties', async () => {
      const response = await axios.get('http://localhost:3001/products/885107/styles')
      const styles = response.data

      if (styles.length === 0) {
        expect(styles.length).toBe(0)
      } else {
        for (let i = 0; i < styles.length; i++) {
          const style = styles[i]
          expect(style).toHaveProperty('style_id')
          expect(style).toHaveProperty('product_id')
          expect(style).toHaveProperty('name')
          expect(style).toHaveProperty('sale_price')
          expect(style).toHaveProperty('original_price')
          expect(style).toHaveProperty('default_style')
          expect(style).toHaveProperty('photos')
          expect(style).toHaveProperty('skus')
        }
      }
    })
  })
})
