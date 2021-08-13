-- psql -u postgres psql < server/schema.sql

-- DROP DATABASE postgres IF EXISTS;

CREATE TABLE reviews (
  id SERIAL,
  product_id INT,
  rating INT,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT,
  PRIMARY KEY (id)
);

COPY reviews FROM '/Users/ssleeyrc/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE reviews_photos (
  id SERIAL,
  reviewer_id INT,
  url TEXT,
  PRIMARY KEY (id)
);

COPY reviews_photos FROM '/Users/ssleeyrc/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE characteristics (
  id SERIAL,
  characteristics_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id)
);

COPY characteristics FROM '/Users/ssleeyrc/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;