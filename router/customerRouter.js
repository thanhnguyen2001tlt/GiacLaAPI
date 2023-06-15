const express = require('express');
const jwt = require('jsonwebtoken');
const customerRouter = express.Router();
const Customer = require('../models/customer');
const secretKey = "MySuperSecretKey113";

// Middleware xác thực JWT
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        console.error('JWT verification failed', err);
        return res.status(403).json({ error: 'Invalid token' });
      }

      req.employeeId = decodedToken.employeeId;
      req.role = decodedToken.role;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Lấy danh sách khách hàng
customerRouter.get('/customers', authenticateJWT, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Failed to get customers', error);
    res.status(500).json({ error: 'Failed to get customers' });
  }
});

// Thêm khách hàng mới
customerRouter.post('/customers', authenticateJWT, async (req, res) => {
  const {name,image,phone,address,point } = req.body;
  const customer = new Customer({name,image,phone,address,point});

  try {
    const savedCustomer = await customer.save();
    res.json(savedCustomer);
  } catch (error) {
    console.error('Failed to create customer', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// Cập nhật thông tin khách hàng
customerRouter.put('/customers/:id', authenticateJWT, async (req, res) => {
  const { name,image,phone,address,point } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {name,image,phone,address,point},
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (error) {
    console.error('Failed to update customer', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// Xóa khách hàng
customerRouter.delete('/customers/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    await Customer.findByIdAndRemove(id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Failed to delete customer', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = customerRouter;

