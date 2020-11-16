const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    role: {type: String, required: true},
    cart: {type: Array, required: true},
    order: {type: Array, required: true}
});

module.exports = mongoose.model('User', UserSchema, 'user');