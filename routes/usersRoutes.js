import { Router } from 'express';

import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersControllers.js';

const userRouter = Router();

userRouter.get(`/`, getUsers);
userRouter.post(`/`, createUser);
userRouter.get(`/:id`, getSingleUser);
userRouter.delete(`/:id`, deleteUser);
userRouter.put(`/:id`, updateUser);

export default userRouter;
