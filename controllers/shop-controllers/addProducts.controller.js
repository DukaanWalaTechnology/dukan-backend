
import logger from "../../logger.js";
import { uploadImageToCloudinary } from "../../lib/uploadImage.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProductToShop = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary API credentials are missing");
    }

    const { shopId, name, description, price, discount, category, stock } = req.body;
    const image = req.files?.image;

    if (!image || !name || !description || !price || !stock) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    // console.log("updated")

    const uploadedImage = await uploadImageToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
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
        interactions:null,
        OrderItem:null
      },
    });
    console.log("newProduct added",newProduct);
    if(newProduct){
      return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
      
    
    }

  } catch (error) {
    console.error("Error while adding product:", error);
    logger.error("Error adding product:", { message: error.message, stack: error.stack });

    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
    });
  }
};

