import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyPayment} from '../controllers/OrderContoller.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/Auth.js';

const orderRouter=express.Router();

//For Admin
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// payment features
orderRouter.post('/place',authUser,placeOrder) //cash on delivery
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post("/verify", verifyPayment);


//user Features for user order

orderRouter.post('/userorders',authUser,userOrders)
export default orderRouter;