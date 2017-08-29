
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  info VARCHAR,
  price VARCHAR,
  sku VARCHAR,
  collections VARCHAR,
  type VARCHAR
);

CREATE TABLE if NOT EXISTS images (
  product_id INTEGER REFERENCES products(id),
  img_url VARCHAR
);
CREATE TABLE if NOT EXISTS description (
  product_id INTEGER REFERENCES products(id),
  description VARCHAR
);

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  size VARCHAR,
  qty VARCHAR,
  completed_date VARCHAR
);

CREATE TABLE IF NOT EXISTS addresses (
  address_id SERIAL PRIMARY KEY,
  street varchar,
  city varchar,
  state varchar,
  country varchar,
  zipcode integer,
  phone varchar,
  company varchar,
  firstname varchar,
  lastname varchar,
  apt varchar,
  user_id integer REFERENCES users(id)
)
