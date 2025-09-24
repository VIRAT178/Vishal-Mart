import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  if (!filePath) return null;

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;  
  }  
};

export default uploadOnCloudinary;
