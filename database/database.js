const { Pool } = require('pg');

const pool = new Pool({
  user: 'ssleeyrc',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('db connected!');
  })
  .catch((err) => {
    console.log('err: ', err);
  });

var getReviews = (query, callback) => {
  // ORDER BY ${sort} DESC (?sort=)
  var { product_id, page, count, sort } = query;
  var response = {
    product: product_id,
    page: page || 0,
    count: count || 5,
    sort: sort || 'relevant'
  };

  response.results = pool.query(`SELECT reviews.id AS review_id,
  reviews.rating, reviews.summary, reviews.recommend, reviews.response,
  reviews.body, to_timestamp(reviews.date/1000) as date,
  reviews.reviewer_name, reviews.helpfulness,
  json_agg(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos
  FROM reviews LEFT JOIN reviews_photos ON reviews_photos.review_id = reviews.id
  WHERE product_id=${product_id} AND reviews.reported=false GROUP BY reviews.id`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, {
        product: response.product,
        page: response.page,
        count: response.count,
        results: result.rows
      });
    }
  });
};

var getMeta = (query, callback) => {
  var { product_id } = query;
  var response = {
    product_id: product_id,
    char: {}
  };

  var ratingQuery = `SELECT json_build_object(
  '1', SUM(CASE WHEN reviews.rating = 1 THEN 1 ELSE 0 END),
  '2', SUM(CASE WHEN reviews.rating = 2 THEN 1 ELSE 0 END),
  '3', SUM(CASE WHEN reviews.rating = 3 THEN 1 ELSE 0 END),
  '4', SUM(CASE WHEN reviews.rating = 4 THEN 1 ELSE 0 END),
  '5', SUM(CASE WHEN reviews.rating = 5 THEN 1 ELSE 0 END)) AS ratings
  FROM reviews WHERE reviews.product_id=${product_id}
  GROUP BY reviews.product_id`;
  // var ratingQuery = `SELECT jsonb_build_object(rating, COUNT(*)) AS ratings FROM reviews WHERE product_id=${product_id} GROUP BY rating`;

  var recommendQuery = `SELECT json_build_object(
  'false', SUM(CASE WHEN reviews.recommend = 'false' THEN 1 ELSE 0 END),
  'true', SUM(CASE WHEN reviews.recommend = 'true' THEN 1 ELSE 0 END)) AS recommended
  FROM reviews WHERE reviews.product_id=${product_id}
  GROUP BY reviews.product_id`;

  var charQuery = `SELECT char_reviews.characteristics_id AS id,
  AVG(char_reviews.value) AS value, characteristics.name
  FROM char_reviews INNER JOIN characteristics
  ON char_reviews.characteristics_id = characteristics.id
  WHERE product_id=${product_id}
  GROUP BY char_reviews.characteristics_id, characteristics.name`;

  pool.query(ratingQuery, (err, ratings) => {
    if (err) {
      console.log('first', err);
    } else {
      response.ratings = ratings.rows[0].ratings;
      pool.query(recommendQuery, (err, recommended) => {
        if (err) {
          console.log('second', err);
        } else {
          response.recommended = recommended.rows[0].recommended;
          pool.query(charQuery, (err, result) => {
            if (err) {
              console.log('third', err);
            } else {
              result.rows.forEach((row) => (
                response.char[row.name] = {
                  id: row.id,
                  value: row.value
                }
              ));
              callback(null, {
                product_id: response.product_id,
                ratings: response.ratings,
                recommended: response.recommended,
                characteristics: response.char
              });
            }
          });
        }
      });
    }
  });
};



module.exports = {
  getReviews, getMeta
};


