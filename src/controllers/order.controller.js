import { Router } from 'express';
import * as OrderService from '../services/order/index.js';
import orderSchema from '../helpers/schemas/order.schema.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
const router = Router();
router.get('/', OrderService.getOrder);
router.get('/:id', OrderService.getOrderId);
router.post('/', joiMiddleware(orderSchema), OrderService.createOrder);

export default router;