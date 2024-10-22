import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const NEON = process.env.NEON;

const sequelize = new Sequelize(NEON, {
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
