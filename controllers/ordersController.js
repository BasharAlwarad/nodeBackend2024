import mongoose from 'mongoose'; // Add this line

import Order from '../models/Orders.js';
import User from '../models/User.js';

// Fetching All Orders with Success Status
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id');
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
};

// Get a Single Order by ID with Success Status
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user_id');
    if (order) {
      res.status(200).json({ success: true, data: order });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch order' });
  }
};

// Create a New Order with Success Status
export const createOrder = async (req, res) => {
  const { price, user_id } = req.body;
  try {
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const newOrder = new Order({
      price,
      user_id,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};

// Update an Existing Order with Success Status
export const updateOrder = async (req, res) => {
  const { price, user_id } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { price, user_id },
      { new: true }
    ).populate('user_id');
    if (updatedOrder) {
      res.status(200).json({ success: true, data: updatedOrder });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ success: false, error: 'Failed to update order' });
  }
};

// Delete an Order with Success Status
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (deletedOrder) {
      res
        .status(200)
        .json({ success: true, message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ success: false, error: 'Failed to delete order' });
  }
};

// Aggregate Orders for a Specific User
export const getUserOrders = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await Order.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
    ]);

    if (orders.length > 0) {
      res.status(200).json({ success: true, data: orders });
    } else {
      res
        .status(404)
        .json({ success: false, error: 'No orders found for this user' });
    }
  } catch (err) {
    console.error('Error aggregating orders for user:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
};
