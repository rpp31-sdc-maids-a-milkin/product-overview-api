CREATE DATABASE atelier;

\c atelier;

-- create tables
CREATE TABLE products (
  product_id integer PRIMARY KEY,
  name varchar(255),
  slogan text,
  description text,
  category varchar(255),
  default_price money,
  features jsonb
);

CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer,
  name varchar(255),
  sale_price text,
  original_price money,
  default_style integer,
  photos jsonb
);

CREATE TABLE skus (
  sku_id integer PRIMARY KEY,
  style_id integer,
  size varchar(255),
  quantity integer
);

-- load data
\copy products FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/product_info.csv' delimiter ',' csv header
\copy styles FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/style_info.csv' delimiter ',' csv header
\copy skus FROM '/Users/julieyu/Documents/hack-reactor/product-overview-api/data/sku_info.csv' delimiter ',' csv header

-- append timestamp info to product table afterwards
ALTER TABLE products ADD COLUMN created_at timestamp DEFAULT NOW();
ALTER TABLE products ADD COLUMN updated_at timestamp DEFAULT NOW();

-- create indexes on styles and skus tables
CREATE INDEX prod_index ON styles (product_id);
CREATE INDEX style_index ON skus (style_id);