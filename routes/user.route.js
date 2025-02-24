import express from 'express';
import { createUser,signIn } from '../controllers/auth.controller.js';
import { fetchProductsForUser } from '../controllers/user-contollers/fetchproducts.controller.js';
import { fetchShops, getShopsProducts } from '../controllers/shop-controllers/shops.controller.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/sign-in', signIn);
router.get('/fetchProducts', fetchProductsForUser);
router.get('/fetchShops',fetchShops);
router.get('/fetchProducts/:shopId',getShopsProducts)
export default router;
