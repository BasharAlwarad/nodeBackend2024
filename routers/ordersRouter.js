import express from 'express';
import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
} from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getSingleOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/userOrders/:user_id', getUserOrders); // New route for getting orders by user_id

export default router;
