import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
console.log(PORT);

const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
