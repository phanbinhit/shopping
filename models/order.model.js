var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
  id_user: {type: String, require: true},
  data: {type: Array, require: true}
});

module.exports = mongoose.model('Order', OrderSchema, 'order');