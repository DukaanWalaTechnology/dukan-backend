import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export const registerShop =async(req,res)=>{
    const{shopName,address,tradeName,gstNumber,panNumber,foodLicense,phone,userId}=req.body;

    try {
        if(!shopName||!address||!tradeName||!foodLicense||!phone||!gstNumber||!panNumber||!userId){
            return res.status(404).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const checkShopExist=await prisma.shopRequest.findUnique({
            where: {
                phone: phone,
              },
        })

        if(checkShopExist){
            return res.status(400).json({
                success: false,
                message: 'A registration request for this phone already exists',
            });
        }
       
        const raiseRequestForRegistration=await prisma.shopRequest.create({
            data:{
                shopName,
                address,
                tradeName,
                foodLicense,
                phone,
                panNumber,
                gstNumber,
                userId
               
            }
        })
        console.log('Shop registration request raised',raiseRequestForRegistration);
        const updateRequestForRegistration=await prisma.user.update({
            where:{id: parseInt(userId)},
            data:{isRequested: true}
        })
        return res.status(200).json({
            succes:true,
            message: 'Shop registration request raised successfully',
            data:raiseRequestForRegistration
        })


        
    } catch (error) {
        console.log("Error while Registering Shop",error);
        logger.error("Error while Registering Shop",error);
        return res.status(500).json({
            message:"Error while Registering Shop",
            success:false

        })
        
    }
}