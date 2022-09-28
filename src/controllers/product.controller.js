import { Router } from 'express';
import * as ProductService from '../services/product/index.js';
import productSchema from '../helpers/schemas/product.schema.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
const router = Router();

router.get('/', ProductService.getProduct);
router.get('/:id', ProductService.getProductId);
router.post('/', joiMiddleware(productSchema), ProductService.createProduct);

export default router;