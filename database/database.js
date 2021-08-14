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
  var { product_id, page, count } = query;
  var response = {
    product: product_id,
    page: page || 0,
    count: count || 5
  };

  response.results = pool.query(`SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, json_agg(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos
  FROM reviews LEFT JOIN reviews_photos ON reviews_photos.review_id = reviews.id
  WHERE product_id=${product_id} AND reviews.reported = false GROUP BY reviews.id`, (err, result) => {
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

module.exports = {
  getReviews: getReviews
};


