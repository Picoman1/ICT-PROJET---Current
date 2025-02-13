import express from 'express'
import { loginUser,registerUser,getUserProfile } from "../controllers/userController.js";
import authUser from '../middleware/Auth.js';
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get("/profile", authUser, getUserProfile);

export default userRouter;