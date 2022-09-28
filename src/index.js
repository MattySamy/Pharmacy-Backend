import express from 'express';
import userRouter from './controllers/user.controller.js';
import ProductRouter from './controllers/product.controller.js';
import logger from './helpers/middlewares/logger.js';
import dotenv from 'dotenv';
import errorHandler from './helpers/middlewares/errorHandler.js';
dotenv.config();
const app = express();

// -- Middleware --
app.use(express.json());
app.use(logger);

// -- Routes --
app.use('/user', userRouter);
app.use('/product', ProductRouter);

app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    console.log(`http://localhost:${PORT}`);
});

export default app;