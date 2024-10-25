import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define(
  'User',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

export default User;

// import { DataTypes } from 'sequelize';
// import sequelize from '../db.js';
// import Order from './Orders.js'; // Import Order model for association

// const User = sequelize.define(
//   'User',
//   {
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'users',
//     timestamps: false,
//   }
// );

// // Define association
// User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

// export default User;

// import { DataTypes } from 'sequelize';
// import sequelize from '../db.js';

// const User = sequelize.define(
//   'User',
//   {
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'users',
//     timestamps: false,
//   }
// );

// export default User;
