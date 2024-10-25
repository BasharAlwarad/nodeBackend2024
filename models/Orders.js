import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Orders = sequelize.define(
  'Orders',
  {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'orders',
    timestamps: false,
  }
);

export default Orders;

// import { DataTypes } from 'sequelize';
// import sequelize from '../db.js';
// import User from './User.js'; // Import User model for association

// const Order = sequelize.define(
//   'Order',
//   {
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//   },
//   {
//     tableName: 'orders',
//     timestamps: false,
//   }
// );

// // Define association
// Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// export default Order;

// import { DataTypes } from 'sequelize';
// import sequelize from '../db.js';
// import User from './User.js';

// const Order = sequelize.define(
//   'Order',
//   {
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//   },
//   {
//     tableName: 'orders',
//     timestamps: false,
//   }
// );

// User.hasMany(Order, { foreignKey: 'user_id' });
// Order.belongsTo(User, { foreignKey: 'user_id' });

// export default Order;
