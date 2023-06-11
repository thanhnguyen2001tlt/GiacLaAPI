const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  servicePrice: Number,
  quantity: Number,
  subtotal: Number
});


module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
