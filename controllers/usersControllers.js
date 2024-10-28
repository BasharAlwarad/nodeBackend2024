import Users from '../models/User.js';
import { CustomError } from '../utils/errorHandler.js';
import { createUserSchema } from '../schema/userSchema.js';

// Fetching All users with optional pagination (skip and limit)
export const getAllUsers = async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query;

  try {
    const users = await Users.findAll({
      offset: parseInt(skip),
      limit: parseInt(limit),
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    next(new CustomError('Failed to fetch users', 500));
  }
};

// Get a single user by ID
export const getSingleUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    next(new CustomError('Failed to fetch user', 500));
  }
};

// Create a new user
export const createUser = async (req, res, next) => {
  const { first_name, last_name, age } = req.body;

  const { error, value } = createUserSchema.validate({
    first_name,
    last_name,
    age,
  });
  if (error) {
    return next(new CustomError(`Invalid input: ${error.message}`, 400));
  }

  try {
    const newUser = await Users.create(value);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    next(new CustomError('Failed to create user', 500));
  }
};

// Update an existing user
export const updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, age } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    await user.update({ first_name, last_name, age });
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    next(new CustomError('Failed to update user', 500));
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    next(new CustomError('Failed to delete user', 500));
  }
};
