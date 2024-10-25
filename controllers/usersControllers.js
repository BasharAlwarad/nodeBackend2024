import Users from '../models/User.js';
import Orders from '../models/Orders.js';

// Fetching All users with optional pagination (skip and limit)
export const getUsers = async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  try {
    const users = await Users.findAll({
      offset: parseInt(skip),
      limit: parseInt(limit),
    });

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
export const getSingleUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await Users.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = await Users.create({ first_name, last_name, age });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const { first_name, last_name, age } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await user.update({ first_name, last_name, age });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
