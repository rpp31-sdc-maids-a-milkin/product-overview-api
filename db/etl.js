const csv = require('csv-parse')
const fs = require('fs')

const products = []
const styles = []
const skus = []

parseCSV('products', products)
  .then(() => {
    attachProperty('features', products, attachFeatures)
  })

parseCSV('styles', styles)
  .then(() => {
    attachProperty('photos', styles, attachPhotos)
  })

parseCSV('skus', skus)

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

function attachProperty (file, storage, customAttachFunc) {
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
    })
    .on('end', function () {
      console.log(storage)
      console.log(`${file}.csv has been parsed`)
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
    style.default = true
    style.photos = [photo]
  } else {
    style.default = false
    style.photos.push(photo)
  }
}
