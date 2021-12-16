const csv = require('csv-parse')
const fs = require('fs')
const csvWriter = require('csv-write-stream')

const products = []
const styles = []
const skus = []

writeProductInfo()
writeStyleInfo()
writeSkuInfo()

// parse then write products and associated features to csv
function writeProductInfo () {
  return new Promise((resolve, reject) => {
    const productWriter = csvWriter({
      headers: [
        'id',
        'name',
        'slogan',
        'description',
        'category',
        'default_price',
        'features'
      ]
    })
    productWriter.pipe(fs.createWriteStream('data/product_info.csv'))

    parseCSV('products', products)
      .then(() => {
        attachProperty('features', products, attachFeatures)
          .then(() => {
            for (let i = 1; i < products.length; i++) {
              const product = products[i]
              const features = JSON.stringify(product.features)
              product.features = features

              productWriter.write(product)
            }
            console.log('product_info.csv has been populated')
            resolve()
          })
      })
      .catch((error) => {
        console.log('product_info.csv could not populate: ', error)
        reject(error)
      })
  })
}

// parse then write styles and associated photos to csv
function writeStyleInfo () {
  return new Promise((resolve, reject) => {
    const styleWriter = csvWriter({
      headers: [
        'id',
        'productId',
        'name',
        'sale_price',
        'original_price',
        'default_style',
        'photos'
      ]
    })
    styleWriter.pipe(fs.createWriteStream('data/style_info.csv'))

    parseCSV('styles', styles)
      .then(() => {
        attachProperty('photos', styles, attachPhotos)
          .then(() => {
            for (let i = 1; i < styles.length; i++) {
              const style = styles[i]
              const photos = JSON.stringify(style.photos)
              style.photos = photos
              styleWriter.write(style)
            }
            console.log('style_info.csv has been populated')
            resolve()
          })
      })
      .catch((error) => {
        console.log('style_info.csv could not populate: ', error)
        reject(error)
      })
  })
}

// parse then write skus to csv
function writeSkuInfo () {
  return new Promise((resolve, reject) => {
    const skuWriter = csvWriter({ headers: ['id', 'styleId', 'size', 'quantity'] })
    skuWriter.pipe(fs.createWriteStream('data/sku_info.csv'))

    parseCSV('skus', skus)
      .then(() => {
        for (let i = 1; i < skus.length; i++) {
          const sku = skus[i]
          skuWriter.write(sku)
        }
        console.log('sku_info.csv has been populated')
        resolve()
      })
      .catch((error) => {
        console.log('sku_info.csv could not populate: ', error)
        reject(error)
      })
  })
}

/* HELPER FUNCTIONS */

// parse main file
function parseCSV (file, storage) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(`data/${file}.csv`)
      .pipe(csv.parse({
        delimiter: ',',
        columns: true,
        relax_quotes: true,
        relax_column_count: true
      }))
      .on('data', function (row) {
        const index = row.id
        storage[index] = row
      })
      .on('error', function (error) {
        console.error(`${file}.csv: `, error.message)
        reject(error)
      })
      .on('end', function () {
        console.log(`${file}.csv has been parsed`)
        resolve()
      })
  })
}

// parse and attach property
function attachProperty (file, storage, customAttachFunc) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(`data/${file}.csv`)
      .pipe(csv.parse({
        delimiter: ',',
        columns: true,
        relax_quotes: true,
        relax_column_count: true
      }))
      .on('data', function (row) {
        customAttachFunc(row)
      })
      .on('error', function (error) {
        console.error(`${file}.csv: `, error.message)
        reject(error)
      })
      .on('end', function () {
        console.log(`${file}.csv has been parsed`)
        resolve()
      })
  })
}

function attachFeatures (row) {
  const index = row.product_id
  const product = products[index]
  const feature = {
    feature: row.feature,
    value: row.value
  }

  if (!product.features) {
    product.features = [feature]
  } else {
    product.features.push(feature)
  }
}

function attachPhotos (row) {
  const index = row.styleId
  const style = styles[index]
  const photo = {
    url: row.url,
    thumbnail_url: row.thumbnail_url
  }

  if (!style.photos) {
    style.photos = [photo]
  } else {
    style.photos.push(photo)
  }
}
