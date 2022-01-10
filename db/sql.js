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
  styles: (productId) => {
    return `
      SELECT y.*, u.*
      FROM styles AS y
        LEFT JOIN skus AS u
        ON y.style_id = u.style_id
      WHERE y.product_id = ${productId}
    `
  }
}

module.exports = sql
