const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    branch: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    decription: {type: String, required: true}
});

module.exports = mongoose.model('Product', ProductSchema, 'product');