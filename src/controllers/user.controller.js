import { Router } from 'express';
import * as UserService from '../services/user/index.js';
import userSchema from '../helpers/schemas/user.schema.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
const router = Router();

router.get('/', UserService.getUser);
router.get('/:id', UserService.getUserById);
router.post('/', joiMiddleware(userSchema), UserService.createUser);

export default router;