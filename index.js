import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Users from './models/User.js';
import sequelize from './db.js';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT;

sequelize
  .sync({ force: false })
  .then(() => console.log('Database synced...'))
  .catch((err) => console.error('Error syncing database:', err));

app.get('/', (req, res) => {
  res.send('<h1>Server is Running!</h1>');
});

// Fetching with query
app.get('/api/v1/users', async (req, res) => {
  try {
    const { name } = req.query;

    const whereClause = name
      ? { where: { first_name: { [Op.like]: `%${name}%` } } }
      : {};

    const users = await Users.findAll(whereClause);
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
});

// Create a new user
app.post('/api/v1/users', async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = await Users.create({ first_name, last_name, age });
    res.status(201).json(newUser);
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
});

// Delete a user
app.delete('/api/v1/users/:id', async (req, res) => {
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
});

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
