import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse, notFoundResponse, } from '../../helpers/functions/ResponseHandler.js';
export async function createOrder(req, res, next) {
    try {
        let { userId, products } = req.body;
        const user = User.find((u) => u.id == userId);
        if (!userId || !products) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (!user) {
            return badRequestResponse(res, 'User not found');
        }
        for (const product of products) {
            const productFound = Product.find(
                (productFound) => productFound.id == product.productId
            );
            if (!productFound) {
                return notFoundResponse(res, 'Product not found');
            }
            if (productFound.quantity < product.quantityTaken) {
                return badRequestResponse(
                    res,
                    'Product quantity not available'
                );
            }
            const productIndex = Product.findIndex(
                (productFound) => productFound.id === product.productId
            );
            Product[productIndex].quantity -= product.quantityTaken;
        }
        const order = {
            id: Order.length + 1,
            userId,
            products,
        }
        Product.push(order);
        return okResponse(res, 'Order created successfully', order);
    } catch (err) {
        next(err);
    }
}