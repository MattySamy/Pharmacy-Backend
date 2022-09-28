import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function createOrder(req, res) {
    try {
        let { userId, products } = req.body;
        const user = User.find((u) => u.id == userId);
        if (!userId || !products) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (!user) {
            return badRequestResponse(res, 'User not found');
        }
        const productsArray = products.map((product) => {
            const productItem = Product.find((p) => p.id == product.id);
            if (!productItem) {
                return badRequestResponse(res, 'Product not found');
            }
            return {
                id: productItem.id,
                name: productItem.name,
                quantity: product.quantity,
            }
        });
        const order = {
            id: Order.length + 1,
            userId,
            productsArray,
        }
        Product.push(order);
        return okResponse(res, 'Order created successfully', order);
    } catch (err) {
        return badRequestResponse(res, err.message);
    }
}