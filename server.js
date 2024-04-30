const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware to handle JSON request
app.use(express.json());

// middleware to setup a cors policy
const corsHandler = cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-type","Authorization"],
    preflightContinue: true,
    optionsSuccessStatus: 200
  });
  

// apply the cors to middleware
app.use(corsHandler);

//connect to MongoDb
mongoose.connect("mongodb://127.0.0.1:27017/ecom")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

//Route

const productRouter = require("./routes/product");

app.use("/products", productRouter);

const categoryRouter = require("./routes/category");

app.use("/categories", categoryRouter);

//Start the server
app.listen(5000, () => {
    console.log("Server is runnning at http://localhost:5000");
});