const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());
// set the upload folder as static path
app.use("/uploads", express.static("uploads"));

// setup a cors policy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

// apply the cors to middleware
app.use(corsHandler);

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecom")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
const productsRoute = require("./routes/product");
const categoriesRoute = require("./routes/category");
const ordersRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const imagesRoute = require("./routes/image");
const userRoute = require("./routes/user");

app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/orders", ordersRoute);
app.use("/payment", paymentRoute);
app.use("/images", imagesRoute);
app.use("/users", userRoute);

// start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
