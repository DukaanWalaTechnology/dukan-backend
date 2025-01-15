
import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"

const prisma = new PrismaClient();
export const fetchPendingrequest=async(req,res)=>{
    try {
        const pendingRquest=await prisma.shopRequest.findMany();
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