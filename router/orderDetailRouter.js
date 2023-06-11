const express = require('express');
const orderDetailRouter = express.Router();
const OrderDetail = require('../models/orderDetail');

// Lấy danh sách chi tiết đơn hàng
orderDetailRouter.get('/order-details', async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find();
    res.json(orderDetails);
  } catch (error) {
    console.error('Failed to get order details', error);
    res.status(500).json({ error: 'Failed to get order details' });
  }
});

// Thêm chi tiết đơn hàng mới
orderDetailRouter.post('/order-details', async (req, res) => {
  const { order, service, servicePrice, quantity, subtotal } = req.body;
  const orderDetail = new OrderDetail({ order, service, servicePrice, quantity, subtotal });

  try {
    const savedOrderDetail = await orderDetail.save();
    res.json(savedOrderDetail);
  } catch (error) {
    console.error('Failed to create order detail', error);
    res.status(500).json({ error: 'Failed to create order detail' });
  }
});

// Cập nhật thông tin chi tiết đơn hàng
orderDetailRouter.put('/order-details/:id', async (req, res) => {
  const { id } = req.params;
  const { order, service, servicePrice, quantity, subtotal } = req.body;

  try {
    const updatedOrderDetail = await OrderDetail.findByIdAndUpdate(
      id,
      { order, service, servicePrice, quantity, subtotal },
      { new: true }
    );
    res.json(updatedOrderDetail);
  } catch (error) {
    console.error('Failed to update order detail', error);
    res.status(500).json({ error: 'Failed to update order detail' });
  }
});

// Xóa chi tiết đơn hàng
orderDetailRouter.delete('/order-details/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await OrderDetail.findByIdAndRemove(id);
    res.json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    console.error('Failed to delete order detail', error);
    res.status(500).json({ error: 'Failed to delete order detail' });
  }
});

module.exports = orderDetailRouter;
