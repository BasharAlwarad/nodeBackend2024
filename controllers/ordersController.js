import Orders from '../models/Orders.js';

// Fetching All order
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();

    res.json(orders);
  } catch (err) {
    console.error('Error fetching Orders:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Get a single order by ID
export const getSingleOrder = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const order = await Orders.findByPk(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create a new order

export const createOrder = async (req, res) => {
  const { price, date, user_id } = req.body;
  try {
    const newOrder = await Orders.create({ price, date, user_id });
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update an existing order
export const updateOrder = async (req, res) => {
  const id = parseInt(req.params.id);
  const { price, date, user_id } = req.body;
  try {
    const order = await Orders.findByPk(id);
    if (order) {
      await order.update({ price, date, user_id });
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an Order
export const deleteOrder = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const order = await Orders.findByPk(id);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
