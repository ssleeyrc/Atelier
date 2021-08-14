-- psql -u postgres psql < server/schema.sql

-- DROP DATABASE postgres IF EXISTS;

CREATE TABLE reviews (
  id SERIAL,
  product_id INT,
  rating INT,
  date VARCHAR (13),
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR (30),
  reviewer_email VARCHAR (50),
  response VARCHAR,
  helpfulness INT,
  PRIMARY KEY (id)
);

COPY reviews FROM '/Users/ssleeyrc/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE reviews_photos (
  id SERIAL,
  review_id INT,
  url VARCHAR,
  PRIMARY KEY (id)
);

COPY reviews_photos FROM '/Users/ssleeyrc/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE char_reviews (
  id SERIAL,
  characteristics_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id)
);

COPY char_reviews FROM '/Users/ssleeyrc/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristics (
  id SERIAL,
  product_id INT,
  name TEXT,
  PRIMARY KEY (id)
);

COPY characteristics FROM '/Users/ssleeyrc/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;
