
import logger from "../../logger.js";
import { uploadImageToCloudinary } from "../../lib/uploadImage.js";
import { PrismaClient } from "@prisma/client";
import express from "express";

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
    console.log("Prisma Product Model:", prisma.product);
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





export const getAllProducts = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Validate shopId
    if (!shopId || isNaN(shopId)) {
      return res.status(400).json({ success: false, message: "Invalid shop ID" });
    }

    // Authenticate User (Assuming JWT token in Authorization header)
   

    // Verify the token
   

    // Check if the shopId belongs to the authenticated user (shopkeeper)
    const shop = await prisma.shop.findUnique({
      where: { id: parseInt(shopId) },
      // include: {
      //   owner: true,  // Assuming a relationship between shop and user (shopkeeper)
      // },
    });

    // Check if shop exists and the authenticated user is the shop owner
    if (!shop) {
      return res.status(403).json({ success: false, message: "Access forbidden: You are not the owner of this shop" });
    }

    // Fetch products related to the shop
    const products = await prisma.product.findMany({
      where: {
        shopId: parseInt(shopId), // Ensure shopId is correctly referenced
      },
    });

    console.log("All products fetched:", products);
    logger.info("All products fetched", products);

    return res.status(200).json({ 
      success: true, 
      message: "Products fetched successfully", 
      results: products 
    });

  } catch (error) {
    console.error("Error while fetching product details", error);
    logger.error("Error while fetching product details", error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching product details",
      error: error.message,
    });
  }
};



export const updateProductInfo=async(req,res)=>{
  const { name="", description="", price="", discount="", stock="",shopId,productId } = req.body;
  const image = req.files?.image;
  try {
    const checkShopExist=await prisma.shop.findUnique({
      where:{
        id:parseInt(shopId)
      }
    })
    if(!checkShopExist){
      return res.status(404).json({
        success:false,
        message:"Shop does not exist",
      })
    }
    const checkProductExist=await prisma.product.findUnique({
      where:{
        id:parseInt(productId)
      }
    })
    if(!checkProductExist){
      return res.status(404).json({
        success:false,
        message:"Product does not exist",
      })
    }
    const updatedImage=await uploadImageToCloudinary(image, process.env.CLOUDINARY_FOLDER_NAME);
    const updatedProduct=await prisma.product.update({
      where:{
        id:parseInt(productId)
      },
      data:{
        name,
        description,
        price:parseFloat(price),
        discount:parseInt(discount),
        stock:parseInt(stock),
        imageUrl:updatedImage?.secure_url,
      }
    })
    console.log("updated product",updatedProduct)
    logger.info("updated product",updatedProduct)
    return res.status(200).json({
      success:true,
      message:"Product updated successfully",
      product:updatedProduct
    })
    
  } catch (error) {
    console.log("Error while updating product details",error);
    logger.error("Error while updating product details",error);
    return res.status(500).json({
      message:"Error while updating product details",
      success:false,
      error:error
    })
    
  }
  

}



export const deleteProduct=async(req,res)=>{
  const { shopId,productId } = req.body;
  console.log(productId,shopId,">>>>")
  try {
    const checkShopExist=await prisma.shop.findUnique({
      where:{
        id:parseInt(shopId)
      }
    })
    if(!checkShopExist){
      return res.status(404).json({
        success:false,
        message:"Shop does not exist",
      })
    }
    const checkProductExist=await prisma.product.findUnique({
      where:{
        id:parseInt(productId)
      }
    })
    if(!checkProductExist){
      return res.status(404).json({
        success:false,
        message:"Product does not exist",
      })
    }
    const deletedProduct=await prisma.product.delete({
      where:{
        id:parseInt(productId)
      }
    })
    
    console.log("deleted product",deletedProduct)
    logger.info("deleted product",deletedProduct)
    return res.status(200).json({
      success:true,
      message:"Product deleted successfully",
      product:deletedProduct
    })
    
  } catch (error) {
    console.log("Error while deleting product details",error);
    logger.error("Error while deleting product details",error);
    return res.status(500).json({
      message:"Error while deleting product details",
      success:false,
      error:error
    })
   
    
  }
}