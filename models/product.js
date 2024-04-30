const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//setup the schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

//convert the schema into a model
const Product = model ("Product",productSchema);
module.exports = Product; 