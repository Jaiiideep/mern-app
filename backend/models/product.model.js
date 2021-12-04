const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: Array, required: false }
    }
);

const Product = mongoose.model('product', productSchema);
module.exports = Product;