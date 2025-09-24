import jwt from "jsonwebtoken";

export const genratetoken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("token error" + error);
  }
};
export const genratetokenAdmin = (admin) => {
  try {
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

