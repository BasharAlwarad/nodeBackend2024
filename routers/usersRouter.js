import { Router } from 'express';

import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersControllers.js';

const userRouter = Router();

userRouter.get(`/`, getAllUsers);
userRouter.get(`/:id`, getSingleUser);
userRouter.post(`/`, createUser);
userRouter.put(`/:id`, updateUser);
userRouter.delete(`/:id`, deleteUser);

export default userRouter;
