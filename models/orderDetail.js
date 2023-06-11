const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  order: String,
  service: String,
  servicePrice: Number,
  quantity: Number,
  subtotal: Number
});


module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
