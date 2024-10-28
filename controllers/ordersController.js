import Orders from '../models/Orders.js';
import { CustomError } from '../utils/errorHandler.js';

// Fetching All orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching Orders:', err);
    next(new CustomError('Failed to fetch orders', 500));
  }
};

// Get a single order by ID
export const getSingleOrder = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return next(new CustomError('Order not found', 404));
    }
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    next(new CustomError('Failed to fetch order', 500));
  }
};

// Create a new order
export const createOrder = async (req, res, next) => {
  const { price, date, user_id } = req.body;

  try {
    const newOrder = await Orders.create({ price, date, user_id });
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    next(new CustomError('Failed to create order', 500));
  }
};

// Update an existing order
export const updateOrder = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { price, date, user_id } = req.body;

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return next(new CustomError('Order not found', 404));
    }

    await order.update({ price, date, user_id });
    res.json(order);
  } catch (err) {
    console.error('Error updating order:', err);
    next(new CustomError('Failed to update order', 500));
  }
};

// Delete an Order
export const deleteOrder = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return next(new CustomError('Order not found', 404));
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    next(new CustomError('Failed to delete order', 500));
  }
};
