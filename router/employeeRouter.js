const express = require('express');
const Employee = require('../models/employee');
const employeeRouter = express.Router();

// Lấy danh sách nhân viên
employeeRouter.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Failed to get employees', error);
    res.status(500).json({ error: 'Failed to get employees' });
  }
});

// Thêm nhân viên mới
employeeRouter.post('/employees', async (req, res) => {
  const { name,username,password, role,image, phone, cccd, address } = req.body;
  const employee = new Employee({ name,username,password, image, phone, cccd, address});

  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (error) {
    console.error('Failed to create employee', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// Cập nhật thông tin nhân viên
employeeRouter.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name,username,password, role,image, phone, cccd, address } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {name,username,password, role,image, phone, cccd, address },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Failed to update employee', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Xóa nhân viên
employeeRouter.delete('/employees/:id', async (req, res) => {
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
