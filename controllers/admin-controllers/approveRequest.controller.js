import { PrismaClient } from '@prisma/client';
import logger from "../../logger.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { request } from 'express';
import { getLatLong } from '../../lib/getLatLong.js';
const prisma = new PrismaClient();


export const approveRequest=async(req,res)=>{
    const{requestId}=req.params;


    try {
        const shopRequest=await prisma.shopRequest.findUnique({
            where:{
                id: parseInt(requestId)
            }

        })
        console.log(shopRequest,"shopRequest")
        if(!shopRequest){
            return res.status(404).json({
                success: false,
                message: 'Shop Request not found',
            });
        }
        const isApproved=await prisma.shop.findUnique({
            where:{
                id:parseInt(requestId)
            }
        })
        console.log(isApproved,"is shop already approved?")
        if(isApproved){
            return res.status(400).json({
                success: false,
                message: 'Shop already approved',
            });
        }
        const owner = await prisma.user.findUnique({
            where: {
              id: shopRequest.userId, 
            },
          });
        console.log("owner gfgfgfginfo",owner)
        
        if(!owner||owner.role!="SHOP_OWNER"){
            return res.status(400).json({
                success: false,
                message: "Owner does not exist or is not a SHOP_OWNER",
              });
        }
        if(owner.isVerified==true){
            return res.status(400).json({
                success: false,
                message: "shop already approved & Owner is already verified",
              });
        }
        // 
        console.log(shopRequest.address,shopRequest.pinCode,"shopRequest.address,shopRequest.pinCode")
        const location = await getLatLong(shopRequest.address,shopRequest.pinCode);
        console.log("Location info",location)
        if (!location) {
           logger.info("No location found for this shop")
        }
        
        const shop=await prisma.shop.create({
            data:{
                shopName: shopRequest.shopName,
                address: shopRequest.address,
                tradeName: shopRequest.tradeName,
                foodLicense: shopRequest.foodLicense,
                phone: shopRequest.phone,
                panNumber: shopRequest.panNumber,
                gstNumber: shopRequest.gstNumber,
                ownerId: owner.id, 
                isApproved:true,
                lat: location.lat, // ✅ Save latitude
                lon: location.lon

            }
        })
        console.log("Shop Registered after raiseing request",shop);
        logger.info("Shop Registered after raiseing request");
        await prisma.shopRequest.update({
            where:{id: parseInt(requestId)},
            data:{status:"APPROVED"}
        })
        await prisma.user.update({
            where:{id: owner.id},
            data:{isVerified: true}
        })
        console.log("Shop status Updated");
        return res.status(200).json({
            succes:true,
            message: 'Shop registered successfully',
            data:shop
        })
      
        
    } catch (error) {
        console.log("Error while Approving Shop",error);
        logger.error("Error while Approving Shop",error);
        return res.status(500).json({
            message:"Error while Approving Shop",
            success:false

        })
        
    }
}