import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import './db.js';

import usersRouter from './routers/usersRouter.js';
import ordersRouter from './routers/ordersRouter.js';

import { CustomError, errorHandler } from './utils/errorHandler.js';

config();
const PORT = process.env.PORT;

// export default CustomError;

const app = express();

app.use(json(), cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Server is Running!</h1>
    <link rel="stylesheet" type="text/css" href="/styles.css">
    `);
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);

app.get('/register', (req, res) => {
  res.send(`
      <html>
      <head>
      <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
      <h1>Submit Your Data</h1>
      <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <button type="submit">Submit</button>
      </form>
      </body>
      </html>
      `);
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(
    `<h2>Received Submission</h2><p>Name: ${name}</p><p>Email: ${email}</p>
        <link rel="stylesheet" type="text/css" href="/styles.css">
        `
  );
});

app.get('/error-test', (req, res, next) => {
  next(new CustomError('This is a custom error!', 400));
});

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
