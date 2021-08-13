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

var getReviews = (callback) => {
  pool.query("SELECT * FROM reviews limit 5", (err, result) => {
    if (err) {
      throw err;
    } else {
      // console.log(result.rows);
      callback(null, result.rows);
      console.log('you did it!!')
    }
  });
};

module.exports = {
  getReviews: getReviews
};


