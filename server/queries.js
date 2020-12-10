const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'root',
  port: 5432,
})

const getReviewsByProduct = (req, res) => {
  const product_id = parseInt(req.body.product_id);
  pool.query(`SELECT reviews.review_id, reviews.product_id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommend, reviews.reported, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, array_to_string(array_agg(distinct review_photos.url), ', ') AS photos FROM reviews LEFT JOIN review_photos ON reviews.review_id = review_photos.review_id WHERE product_id = ${product_id} GROUP BY reviews.review_id, review_photos.review_id;`, (error, results) => {
    if (error) {
      res.status(404)
    }
    res.status(200).json(results.rows)
  })
}


const getReviewMetaData = (req, res) => {

}

module.exports = {
  getReviewsByProduct,
  getReviewMetaData,
}


