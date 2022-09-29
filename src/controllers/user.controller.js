import { Router } from 'express';
import * as UserService from '../services/user/index.js';
import userSchema from '../helpers/schemas/user.schema.js';
import joiMiddleware from '../helpers/middlewares/joiMiddleware.js';
// import multer from 'multer';
// import { join } from 'path';
const router = Router();
router.get('/', UserService.getUser);
router.get('/:id', UserService.getUserById);
router.post('/', joiMiddleware(userSchema), UserService.createUser);
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         if (file.filename == 'image') {
//             cb(null, join(process.cwd(), '/public/uploads/image'));
//         } else {
//             cb(null, join(process.cwd(), '/public/backdrop/backdrop'));
//         }
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });
// const upload = multer({ storage: storage })
// export default router;
// const cpUpload = upload.fields([{ name: 'image' }, { name: 'backdrop' }])
// router.post('/profile', cpUpload, function(req, res) {
//     console.log(req.files);
//     res.send('ok');
// });
export default router;