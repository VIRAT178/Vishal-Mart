
import express from 'express';
import dotenv from 'dotenv'
import connetDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRotues from './Routes/authRoutes.js';
import userRoutes from './Routes/userRotutes.js';
import productRoutes from './Routes/productRoutes.js';
import susrouter from './Routes/suscriberRoutes.js';
import cartRoutes from './Routes/CartRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
dotenv.config();
let PORT = process.env.PORT || 5000;


let app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin:["http://localhost:5173","http://localhost:5174"],
   credentials: true,
}))


app.use('/api/auth', authRotues);
app.use('/api/user', userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/suscriber',susrouter);
app.use('/api/order',orderRoutes)


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    connetDb();
})