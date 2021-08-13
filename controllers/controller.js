// const model = require('../models');

module.exports = {
  showReviews: (req, res) => {
    if (req.method === 'get') {
      res.statusCode = 200;
      res.end('SELECT * FROM reviews');
    }
  },

  createReview: (req, res) => {
    var newReview = req.body;

    model.review.create(newReview)
      .then((success) => {
        res.statusCode = 200;
        res.end();
      })
      .catch((err) => {
        res.statusCode = 404;
        res.end('Failed to create review', err);
      });
  },

  getMeta: (req, res) => {
    if (req.method === 'get') {
      res.statusCode = 200;
      res.end('SELECT product_id, rating, recommend FROM reviews');
    }
  }

};