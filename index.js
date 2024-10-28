import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import './db.js';

import usersRouter from './routers/usersRouter.js';
import ordersRouter from './routers/ordersRouter.js';

config();

const app = express();

app.use(json(), cors());
app.use(express.static('public'));

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send(`
    <h1>Server is Running!</h1>
    <link rel="stylesheet" type="text/css" href="/styles.css">
  `);
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
