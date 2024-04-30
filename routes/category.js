const express = require("express");

// create express router for movies
const router = express.Router();

// load all the models
const Product = require("../models/product");

router.get("/", async (req, res) => {
  const category = req.query.category;
  let categories = [];
  
    // load all the products to extract category out of it
    const products = await Product.find();
    // extract category from products
    products.forEach((product) => {
      // if is not available, then only add into categories
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
  
  res.status(200).send(categories);
});

module.exports = router;


