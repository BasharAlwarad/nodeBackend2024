import { db } from '../db.js';
import { ObjectId } from 'mongodb';

// Fetching All Orders with Success Status
export const getAllOrders = async (req, res) => {
  try {
    const orderCollection = db.collection('orders');
    const orders = await orderCollection.find().toArray();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
};

// Get a Single Order by ID with Success Status
export const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const orderCollection = db.collection('orders');
    const order = await orderCollection.findOne({ _id: new ObjectId(id) });
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
    const orderCollection = db.collection('orders');

    const userExists = await db
      .collection('users')
      .findOne({ _id: new ObjectId(user_id) });
    if (!userExists) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const newOrder = {
      price,
      date: new Date(),
      user_id: new ObjectId(user_id),
    };
    const result = await orderCollection.insertOne(newOrder);
    res
      .status(201)
      .json({ success: true, data: { id: result.insertedId, ...newOrder } });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};

// Update an Existing Order with Success Status
export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { price, date, user_id } = req.body;
  try {
    const orderCollection = db.collection('orders');
    const order = await orderCollection.findOne({ _id: new ObjectId(id) });
    if (order) {
      const updatedOrder = await orderCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { price, date, user_id: new ObjectId(user_id) } },
        { returnDocument: 'after' }
      );
      res.status(200).json({ success: true, data: updatedOrder.value });
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
  const id = req.params.id;
  try {
    const orderCollection = db.collection('orders');
    const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
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
