'use strict';
const pg = require('pg');
// const db = pg()
// connect to database 

module.exports = {
  create: (review) => {
    return new Promise((resolve, reject) => {
      var insertQry = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      var params = [];
      db.query(insertQry, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
};