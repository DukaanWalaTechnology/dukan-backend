
import express from 'express';
import { registerShop } from '../controllers/shop-controllers/register.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post('/shop/register', registerShop);

export default router;