
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
    // fetch shop id
    const shopInfo=await prisma.shop.findUnique({
      where: {
        id: parseInt(shopId),
      },
    
    })
    console.log("shop info",shopInfo)

    const uploadedImage = await uploadImageToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
    const newProduct = await prisma.product.create({
      data: {
        shop: { 
          connect: { id: shopInfo.id } // Connect the shop using its ID
        },
        name: name,
        description: description,
        price: parseFloat(price),
        discount: parseInt(discount) || 0,
        category: category || null,
        stock: parseInt(stock),
        imageUrl: uploadedImage?.secure_url,
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
      error:error.message,
    });
  }
};

