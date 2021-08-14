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

var getReviews = (product_id, callback) => {
  let query = 
  pool.query(`SELECT * FROM reviews where reviews.product_id = ${product_id}`, (err, result) => {
    if (err) {
      throw err;
    } else {
      callback(null, result.rows);
    }
  });
};

module.exports = {
  getReviews: getReviews
};


