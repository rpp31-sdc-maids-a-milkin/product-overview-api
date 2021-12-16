-- psql postgres root -h 127.0.0.1 -f -a db/schema.sql

CREATE DATABASE atelier;

\c atelier;

-- create tables
CREATE TABLE products (
  product_id integer PRIMARY KEY,
  product_name varchar(255),
  product_slogan text,
  product_description text,
  product_category varchar(255),
  product_default_price money,
  product_features jsonb
);

CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer,
  style_name varchar(255),
  style_sale_price text,
  style_original_price money,
  style_default integer,
  style_photos jsonb
);

CREATE TABLE skus (
  sku_id integer PRIMARY KEY,
  style_id integer,
  sku_size varchar(5),
  sku_quantity integer
);

-- load data
\copy products FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/product_info.csv' delimiter ',' csv header
\copy styles FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/style_info.csv' delimiter ',' csv header
\copy skus FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/sku_info.csv' delimiter ',' csv header

-- append timestamp info to product table afterwards
ALTER TABLE products ADD COLUMN product_created_at timestamp DEFAULT NOW();
ALTER TABLE products ADD COLUMN product_updated_at timestamp DEFAULT NOW();