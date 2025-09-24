import uploadOnCloudinary from "../config/cloudinary.js";
import Admin from "../Model/Admin_Model.js";
import Product from "../Model/Product_Model.js";
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;



    const uploadPromises = ["image1", "image2", "image3", "image4"].map(
      (key) => uploadOnCloudinary(req.files[key][0].path)
    );
    const [image1, image2, image3, image4] = await Promise.all(uploadPromises);


    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };


    const product = await Product.create(productData);
    return res.status(201).json({ message: "Product Added Successfully", product });


  } catch (error) {
    console.error("Product Add error:", error);
    return res.status(500).json({ message: "Product Can't Added", error: error.message });
  }
};


export const listProduct = async (req,res) => {
  try {
    const product = await Product.find({});
    return res.status(201).json(product);
  } catch (error) {
    console.error("Products get error:", error);
    return res.status(500).json({ message: "Products Can't Get", error: error.message });
  }
}


export const removeProduct = async (req,res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(201).json({message:"Product deleted successfully",product});
  } catch (error) {
    console.error("Product delete error:", error);
    return res.status(500).json({ message: "Products Can't delete", error: error.message });
  }
}