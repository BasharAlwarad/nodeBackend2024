import User from './User.js';
import Orders from './Orders.js';

User.hasMany(Orders, { foreignKey: 'user_id', as: 'orders' });
Orders.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
