-- psql postgres root -h 127.0.0.1 -f -a db/schema.sql

CREATE DATABASE atelier;

\c atelier;

CREATE TABLE product_info (
  product_id integer PRIMARY KEY,
  product_name varchar(255),
  product_slogan text,
  product_description text,
  product_category varchar(255),
  product_default_price money,
  product_features jsonb,
  product_created_at timestamp,
  product_updated_at timestamp
);

CREATE TABLE style_info (
  style_id integer PRIMARY KEY,
  product_id integer REFERENCES product_info,
  style_name varchar(255),
  style_original_price money,
  style_sale_price money,
  style_default boolean,
  style_photos jsonb
);

CREATE TABLE sku_info (
  sku_id integer PRIMARY KEY,
  style_id integer REFERENCES style_info,
  sku_size varchar(5),
  sku_quantity integer
);