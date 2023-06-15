const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  orderDate: Date,
  deliveryDate: Date,
  totalAmount: Number,
  prepaidAmount: Number,
  remainingAmount: Number,
  
});

module.exports = mongoose.model('Order', OrderSchema);
