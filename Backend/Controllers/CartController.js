import User from "../Model/User_Model.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      res.status(404).json({ message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    const cartItems = await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Added to Cart", cartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't Add to Cart" });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't update Cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = userData.cartData;
    return res.status(200).json(cartData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't get User Cart" });
  }
};

