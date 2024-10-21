import express, { json } from 'express';
import dotenv from 'dotenv';

import { queryDB } from './db.js';

dotenv.config();

const app = express();

app.use(json());

const PORT = process.env.PORT;

// Get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await queryDB('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a single user by ID
app.get('/api/v1/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await queryDB('SELECT * FROM users WHERE id = $1', [id]);
    if (user.length > 0) {
      console.log(user);
      res.json(user[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
app.post('/api/v1/users', async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = await queryDB(
      'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
      [first_name, last_name, age]
    );

    res.status(201).json(newUser[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update an existing user
app.put('/api/v1/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, age } = req.body;
  try {
    const updatedUser = await queryDB(
      'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
      [first_name, last_name, age, id]
    );

    if (updatedUser.length > 0) {
      res.json(updatedUser[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
app.delete('/api/v1/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await queryDB(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    if (deletedUser.length > 0) {
      res.json(deletedUser[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
