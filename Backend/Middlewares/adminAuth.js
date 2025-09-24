import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not Authorized admin" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Admin verification failed" });
    }
    req.userId = decoded.id;
    console.log("Set req.userId:", req.userId);
    next();
  } catch (error) {
    console.log("Admin authentication failed:", error);
    return res
      .status(401)
      .json({ message: `Admin verification failed: ${error.message}` });
  }
};

export default adminAuth;
