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

  pool.query(`SELECT * FROM reviews where product_id=${query.product_id} ORDER BY ${query.sort} DESC`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result.rows);
    }
  });
};

module.exports = {
  getReviews: getReviews
};


