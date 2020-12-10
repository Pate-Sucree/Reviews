require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries.js');


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request,response) => {
  response.json({
    info: 'Welcome to the server!!'
  })
})

app.get('/reviews', db.getReviewsByProduct)

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`)
})

// app.get('/reviews', (req,res) => {
//   db.getReviewsByProduct(req.body.product_id), (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json(data);
//     }
//   }
// })