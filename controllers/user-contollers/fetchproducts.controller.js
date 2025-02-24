import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

// need to be updated in future versions
export const fetchProductsForUser=async(req,res)=>{
    try {
    const { userId } = req.params;
    const fetchProducts = await prisma.product.findMany({
        include:{shop:{
            select:{
                shopName:true,
                address:true,
                phone:true,
                profileImage:true
            }
        }}
    });
    console.log("All products fetched:", fetchProducts);
    if(!fetchProducts){
        return res.status(404).json({
            success: false,
            message: 'No products found',
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: fetchProducts,
    })

        
    } catch (error) {
        console.error("Error while fetching products for user", error);
        logger.error("Error while fetching products for user", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching products for user",
            error: error.message,
        });
        
    }
}