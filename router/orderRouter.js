const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order');

// Lấy danh sách đơn hàng
orderRouter.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Failed to get orders', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

// Thêm đơn hàng mới
orderRouter.post('/orders', async (req, res) => {
  const { customer, orderDate, deliveryDate, totalAmount, prepaidAmount, remainingAmount } = req.body;
  const order = new Order({ customer, orderDate, deliveryDate, totalAmount, prepaidAmount, remainingAmount });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    console.error('Failed to create order', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Cập nhật thông tin đơn hàng
orderRouter.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { customer, orderDate, deliveryDate, totalAmount, prepaidAmount, remainingAmount } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { customer, orderDate, deliveryDate, totalAmount, prepaidAmount, remainingAmount },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error('Failed to update order', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Xóa đơn hàng
orderRouter.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Order.findByIdAndRemove(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Failed to delete order', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = orderRouter;
