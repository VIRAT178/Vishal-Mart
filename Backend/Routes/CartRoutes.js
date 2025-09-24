import express from 'express'
import isAuth from '../Middlewares/isAuth.js';
import { addToCart, getUserCart, updateCart } from '../Controllers/CartController.js';
const cartRoutes = express.Router();
cartRoutes.post('/get',isAuth, getUserCart);
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update',isAuth,updateCart)
export default cartRoutes