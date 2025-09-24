import express from 'express';
import { allOrders, placeOrder, placeOrderRazorpay, updateStuta, userOrders, verifyRazorpay } from '../Controllers/OrderController.js';
import isAuth from '../Middlewares/isAuth.js';
import adminAuth from '../Middlewares/adminAuth.js';

const orderRoutes = express.Router();

orderRoutes.post('/placeorder',isAuth,placeOrder);
orderRoutes.post('/placeorderbyrazorpay',isAuth,placeOrderRazorpay);
orderRoutes.post('/userorder',isAuth,userOrders);
orderRoutes.post('/list',adminAuth,allOrders);
orderRoutes.post('/status',adminAuth,updateStuta)
orderRoutes.post('/verifyOrder',verifyRazorpay)

export default orderRoutes;