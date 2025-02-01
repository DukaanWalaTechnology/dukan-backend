import { PrismaClient } from '@prisma/client';
import logger from '../logger.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(404).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const checkUserExist = await prisma.user.findUnique({
            where: { email },
        });

        if (checkUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, role, password: hashedPassword },
        });

        console.log('User created',newUser);
        logger.info('User created', newUser);
        return res.json({
            success: true,
            message: 'User created successfully',
            newUser,
        });
    } catch (error) {
        console.log('Error while creating user', error);
        logger.error('Error while creating user', error);
        return res.json({
            success: false,
            message: 'Error while creating user',
        });
    }
};


export const signIn=async(req,res)=>{
    const{email,password}=req.body;

    try {
        
        if(!email||!password){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            })
        }
        const checkUserExists=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        console.log(checkUserExists,"user exist?");
        if(!checkUserExists){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        const verifyPassword=await bcrypt.compare(password,checkUserExists.password);
        if(!verifyPassword){
            return res.status(401).json({
                success:false,
                message:"Invalid Password",
            })
        }
        const payload={
            email:checkUserExists.email,
            id:checkUserExists.id,
            name:checkUserExists.name,
            role:checkUserExists.role,
        }
        // generate jwt token
        const token=jwt.sign(payload,process.env.JSON_WEB_TOKEN,{
            expiresIn:"10h"
        });
        checkUserExists.password=undefined;
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            userData:checkUserExists,
            message:"User LoggedIn successfully"

        })

    
    } catch (error) {
        console.log("error while Logining User",error);
        logger.error("error while Logging user",error);
        return res.status(500).json({
            message:"Error while Logging User",
            success:false

        })
        
    }
}

export const logoutUser = async (req, res) => {
    try {
      res.clearCookie("token");
      console.log("user logged out")
      logger.info("User logged out");  // Logged out activity should be logged here too.  For demonstration, I've left it commented out.  You may uncomment it as per your requirement.  Note: This will not log out the user from the database, only from the server-side session.  If you want to log out from the database as well, you would need to add logic to delete the user's session in your database as well.  For simplicity,
      
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
  
    } catch (error) {
      console.log("Error during logout", error);
      logger.error("Error during logout", error);
      return res.status(500).json({
        success: false,
        message: "Error during logout",
        error: error.message,
      });
    }
  };
  