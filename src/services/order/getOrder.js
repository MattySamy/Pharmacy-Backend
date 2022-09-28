import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getOrder(req, res, next) {
    try {
        const orders = Order.map((o) => {
            const user = User.find((u) => u.id == o.userId);
            const productsArray = o.productsArray.map((product) => {
                const productItem = Product.find((p) => p.id == product.id);
                return {
                    ...productItem,
                    quantity: product.quantity,
                }
            });
            const order = {
                ...o,
                user,
                productsArray,
            }
            delete order.userId;
            return order;
        });
        return okResponse(res, 'All Orders Found succesfully', orders);
    } catch (err) {
        next(err);
    }
}