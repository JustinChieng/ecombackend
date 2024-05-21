const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// set up product router
const router = express.Router();

// get products
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getProducts(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newProduct = await addProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const updatedProduct = await updateProduct(
      req.params.id,
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
