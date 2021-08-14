const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression')
// const config = require('../config.js');
const db = require('../models/model.js');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(compression());
app.use(express.json());

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});


app.get('/reviews', (req, res) => {

  db.getReviews(req.query, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.send(result);
    }
  });
});