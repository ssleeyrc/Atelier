'use strict';
module.exports = function(app) {
  var review = require('../controllers');

  app.route('/reviews')
    .get(review.showReviews)
    .post(review.createReview);

  app.route('/reviews/meta')
    .get(review.getMeta);
};