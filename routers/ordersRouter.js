import { Router } from 'express';

import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/ordersController.js';

const ordersRouter = Router();

ordersRouter.get(`/`, getAllOrders);
ordersRouter.get(`/:id`, getSingleOrder);
ordersRouter.post(`/`, createOrder);
ordersRouter.put(`/:id`, updateOrder);
ordersRouter.delete(`/:id`, deleteOrder);

export default ordersRouter;
