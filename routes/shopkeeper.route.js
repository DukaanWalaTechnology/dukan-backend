
import express from 'express';
import { registerShop } from '../controllers/shop-controllers/register.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { addProductToShop } from '../controllers/shop-controllers/addProducts.controller.js';
const router = express.Router();
router.post('/shop/register', registerShop);
router.post('/shop/addProducts', addProductToShop);
export default router;