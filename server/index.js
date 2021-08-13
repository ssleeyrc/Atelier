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

app.get('/', (req, res) => {
  console.log('this is from the server');
});

app.get('/reviews', (req, res) => {
  console.log('this is get reviews');
  db.getReviews((err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      // console.log(result);
      res.send(result);
    }
  })
    // .then((result) => {
    //   res.send(result);
    // })
    // .catch((err) => {
    //   res.sendStatus(404);
    // })
});