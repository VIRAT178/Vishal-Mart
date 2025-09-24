import Order from "../Model/OrderModel.js";
import User from "../Model/User_Model.js";


export const  placeOrder = async (req,res) => {
    try {
        const {items,amount,address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment : false,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId,{cartData:{}})
        return res.status(201).json({message:'Order placed'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Cant placed order'});
    }
}

export const userOrders = async (req,res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({userId});
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"user Orders error"});
    }
}

// for admin

export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"All orders error"})
    }
}

export const updateStuta = async (req,res) => {
    try {
        const {orderId, status} = req.body;
        await Order.findByIdAndUpdate(orderId,{status});
        return res.status(201).json({message:"Status Updated"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}
import razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        const currency = 'INR';

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
            res.status(200).json(order);
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}
export const verifyRazorpay = async (req,res) => {
    try {
        const userId = req.userId;
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status==='paid') {
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId,{cartData:{}});
            return res.status(200).json({message:"payment successful"})
        }else{
            return res.json({message:"paymenr failed!"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"paymenr failed!"})
    }
}
