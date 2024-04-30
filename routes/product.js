const express = require("express");
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require("../controllers/product");

// create express router for movies
const router = express.Router();

// load all the models
const Movie = require("../models/product");

//* CRUD
// get all product
router.get("/", async (req, res) => {
    try {
      const category = req.query.category;
      const products = await getProducts(category);
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });

//get 1 product
router.get("/:id", async (req, res) => {
    try {
      const product = await getProduct(req.params.id);
      if (!product) {
        // If product is not found, return an error message
        return res.status(404).send({
          message: "Product not found",
        });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });
  

  

//add product
router.post("/", async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
  
      // Check if any of the fields are empty
      if (!name || !price || !category) {
        // If any field is empty, return an error message
        return res.status(400).send({
          message: "Cannot leave empty name, price, and category",
        });
      }
  
      const newProduct = await addProduct(name, description, price, category);
      res.status(200).send(newProduct);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });
  

//update product
router.put("/:id", async (req, res) => {
    try {
      const product_id = req.params.id;
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
  
      // Check if any of the fields are empty
      if (!name || !price || !category) {
        // If any field is empty, return an error message
        return res.status(400).send({
          message: "Cannot leave empty name, price, and category",
        });
      }
  
      // Update the product
      const updatedProduct = await updateProduct(
        product_id,
        name,
        description,
        price,
        category
      );
  
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });
  

//delete product
router.delete("/:id", async (req, res) => {
    const product_id = req.params.id;
    try {
      await deleteProduct(product_id);
      res.status(200).send({ message: `Product #${product_id} has been deleted` });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });


module.exports = router;
// export default router;