const sql = {
  products: (page, count) => {
    const offset = (page * count) - count
    return `
      SELECT product_id, name, slogan, description, category,
      default_price, created_at, updated_at
      FROM products
      LIMIT ${count}
      OFFSET ${offset}
    `
  },
  product: (productId) => { return `SELECT * FROM products WHERE product_id = ${productId}` },
  styles: (productId) => { return `SELECT * FROM styles WHERE product_id = ${productId}` },
  skus: (styleId) => { return `SELECT * FROM skus WHERE style_id = ${styleId}` }
}

module.exports = sql
