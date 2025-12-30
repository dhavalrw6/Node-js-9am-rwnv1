import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUser, login, logout, updateUser } from "../controllers/user.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const router = Router();

// Create user
router.post('/', createUser);
// login
router.post('/login', login);
// find all user
router.get('/logout', logout);


// router.use(userAuth);

router.get('/', getAllUser);

// find single user
router.get('/:id', getUser);

// Delete user 
router.delete('/:id', deleteUser);

// update user
router.patch('/:id', updateUser);



export default router;