import express from 'express'
import { AdminLogin, AdminSignup, googleLogin, login, logout, Register } from '../Controllers/authController.js';

const authRotues = express.Router();

authRotues.post('/registration',Register);
authRotues.post('/login',login);
authRotues.get('/logout', logout);
authRotues.post('/googlelogin', googleLogin)
authRotues.post('/adminSignup',AdminSignup)
authRotues.post('/adminLogin', AdminLogin)

export default authRotues;