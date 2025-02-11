
import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"

const prisma = new PrismaClient();
export const fetchPendingrequest=async(req,res)=>{
    try {
        const pendingRquest=await prisma.shopRequest.findMany(
            {
                where:{
                    status:"PENDING"
                }
            }
        );
        console.log("Pending Requests",pendingRquest);
        if(!pendingRquest){
            return res.status(404).json({
                success: false,
                message: 'No pending requests found',
            });
        }
        return res.json({
            success:true,
            message: 'Pending requests fetched successfully',
            data:pendingRquest
        })
    } catch (error) {
        console.log("Error while fetching pending request",error);
        logger.error("Error while fetching pending request",error);
        return res.status(500).json({
            message:"Error while fetching pending request",
            success:false

        })
        
    }

}

export const fetchRegisteredShops=async(req,res)=>{
    try {
        const shop=await prisma.shop.findMany();
        console.log("registered Requests",shop);
        if(!shop){
            return res.status(404).json({
                success: false,
                message: 'No Registered Shops Found',
            });
        }
        return res.json({
            success:true,
            message: 'Registered shops fetched successfully',
            data:shop
        })
        
    } catch (error) {
        console.log("Error while fetching all shops",error);
        logger.error("Error while fetching all shops",error);
        return res.status(500).json({
            message:"Error while fetching all shops",
            success:false

        })
        
    }
}