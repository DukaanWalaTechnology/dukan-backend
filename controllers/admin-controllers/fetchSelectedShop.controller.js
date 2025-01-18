import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"

const prisma = new PrismaClient();


export const fetchSelectedShop=async(req,res)=>{
    const {shopId}=req.params;
    try {
        // performing joins
        const selectedShop=await prisma.shopRequest.findUnique({
            where:{
                id:parseInt(shopId)
            },
            include:{
                user:{
                    select:{
                        name:true,
                        email:true,
                        role:true,
                    }
                }
            }
        });
        console.log(selectedShop,"selected shop data");
        if(!selectedShop){

            return res.status(404).json({
                success: false,
                message: 'No shop found with given shopId',
            });
        }
        logger.info('Shop fetched successfullyy')
        return res.json({
            success:true,
            message: 'Shop fetched successfully',
            data:selectedShop
        })
        // logger.info('Shop fetched successfullyy')
        
    } catch (error) {
        console.log("Error while fetching shop",error);
        logger.error("Error while fetching shop",error);
        return res.status(500).json({
            message:"Error while fetching shop",
            success:false

        })
        
    }
}