import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import {
  getCurrentAdmin,
  getCurrentUser,
} from "../Controllers/userController.js";
import adminAuth from "../Middlewares/adminAuth.js";
const userRoutes = express.Router();
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
userRoutes.get("/getcurrentadmin", adminAuth, getCurrentAdmin);
export default userRoutes;

