import User from '../models/User.js';

// Fetching All Users with Optional Pagination (skip and limit)
export const getAllUsers = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const users = await User.find().skip(parseInt(skip)).limit(parseInt(limit));
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

// Get a Single User by ID
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

// Create a New User
export const createUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = new User({ first_name, last_name, age });
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: { id: savedUser._id, first_name, last_name, age },
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

// Update an Existing User
export const updateUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { first_name, last_name, age },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({ success: true, data: updatedUser });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res
        .status(200)
        .json({ success: true, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};
