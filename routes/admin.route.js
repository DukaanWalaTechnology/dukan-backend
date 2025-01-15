import express from 'express';
import { createUser,signIn } from '../controllers/auth.controller.js';
import { registerShop } from '../controllers/shop-controllers/register.controller.js';
import { approveRequest } from '../controllers/admin-controllers/approveRequest.controller.js';
import { fetchPendingrequest } from '../controllers/admin-controllers/fetchPendingrequest.controller.js';
const router = express.Router();

router.patch('/shop-request/:requestId/approve', approveRequest)
router.get('/shop-request',fetchPendingrequest)
export default router;