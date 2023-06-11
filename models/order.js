const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer:String,
  orderDate: Date,
  deliveryDate: Date,
  totalAmount: Number,
  prepaidAmount: Number,
  remainingAmount: Number,
  
});

module.exports = mongoose.model('Order', OrderSchema);Order;
