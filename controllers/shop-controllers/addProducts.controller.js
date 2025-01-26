
import logger from "../../logger.js";
import { uploadImageToCloudinary } from "../../lib/uploadImage.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProductToShop = async (req, res) => {
  
    // Debugging Environment Variables (remove in production)
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary API credentials are missing");
    }

    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { shopId, name, description, price, discount, category, stock } = req.body;
    const image = req.files.image;
    console.log("Image:", image);

    // Validation: Check if all required fields are present
    if (!image) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ success: false, message: "Missing required fields: name, description, price, or stock" });
    }

    console.log("Bale bale")
    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
    console.log("Cloudinary Upload Result:", uploadedImage);

    // Add product to the database
    try{
    const newProduct = await prisma.product.create({
      
      data: {
        shopId: parseInt(shopId),
        name,
        description,
        price: parseFloat(price),
        discount: parseInt(discount) || 0,
        category: category || null,
        stock: parseInt(stock),
        imageUrl: uploadedImage?.secure_url,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("error while adding product:", error);
    logger.error("Error adding product:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
      error: error,
    });
  }
};
