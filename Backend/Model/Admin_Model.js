import mongoose from "mongoose";

const AdminSchem = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
},{timestamps:true});

const Admin = mongoose.model('Admin', AdminSchem);
export default Admin;