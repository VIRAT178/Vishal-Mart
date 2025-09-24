import Admin from "../Model/Admin_Model.js";
import User from "../Model/User_Model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: error.message });
  }
};
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.userId).select("email");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ email: admin.email, role: "admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
