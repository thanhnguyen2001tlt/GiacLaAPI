const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const employeeRouter = express.Router();


// Lấy danh sách nhân viên
employeeRouter.get('/employees', authenticateJWT, async (req, res) => {
  try {
    const employees = await Employee.find({ role: { $ne: 'admin' } });
    res.json(employees);
  } catch (error) {
    console.error('Failed to get employees', error);
    res.status(500).json({ error: 'Failed to get employees' });
  }
});

// Thêm nhân viên mới
employeeRouter.post('/employees', authenticateJWT, async (req, res) => {
  // Kiểm tra vai trò của người dùng
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can add employees' });
  }

  const { name, username, password, role, image, phone, cccd, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = new Employee({
    name,
    username,
    password: hashedPassword,
    role,
    image,
    phone,
    cccd,
    address,
  });

  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (error) {
    console.error('Failed to create employee', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// Cập nhật thông tin nhân viên
employeeRouter.put('/employees/:id', authenticateJWT, async (req, res) => {
  // Kiểm tra vai trò của người dùng
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update employees' });
  }

  const { id } = req.params;
  const { name, username, password, role, image, phone, cccd, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        username,
        password: hashedPassword,
        role,
        image,
        phone,
        cccd,
        address,
      },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Failed to update employee', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Xóa nhân viên
employeeRouter.delete('/employees/:id', authenticateJWT, async (req, res) => {
  // Kiểm tra vai trò của người dùng
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete employees' });
  }

  const { id } = req.params;

  try {
    await Employee.findByIdAndRemove(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Failed to delete employee', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = employeeRouter;
