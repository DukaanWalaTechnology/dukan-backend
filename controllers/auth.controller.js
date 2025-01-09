import { PrismaClient } from '@prisma/client';
import logger from '../logger.js';
import bcrypt from 'bcrypt';

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

        console.log('User created');
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
