import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"
const prisma = new PrismaClient();

export const fetchShops = async (req, res) => {
    try {
        const shops = await prisma.shop.findMany();
        console.log("All shops fetched:", shops);
        
        return res.status(200).json({
            success: true,
            message: 'Shops fetched successfully',
            data: shops,
        });
    } catch (error) {
        logger.error("Error while fetching shops:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching shops',
            error: error.message
        });
    }
}


export const getShopsProducts=async(req,res)=>{
    try {
        const shopId = parseInt(req.params.shopId);
        const products = await prisma.product.findMany({
            where: {
                shopId: shopId,
            },
        });
        console.log("Products fetched for shop:", shopId, products);

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products,
        });
        
    } catch (error) {
        console.error("Error while fetching products for shop", error);
        logger.error("Error while fetching products for shop", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching products for shop",
            error: error.message,
        });
        
    }
}