import {Router} from "express";
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

// get All User
userRouter.get('/',getAllUser);
userRouter.get('/:id',getUser);
userRouter.post('/',createUser);
userRouter.delete('/:id',deleteUser);
userRouter.patch('/:id',updateUser);

export default userRouter;