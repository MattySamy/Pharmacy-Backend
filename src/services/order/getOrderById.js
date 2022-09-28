import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getOrderId(req, res, next) {
    try {
        const id = req.params.id;
        let order = Order.find((o) => o.id == id);
        if (!order) {
            return badRequestResponse(res, 'there is no order with that id');
        }
        const user = User.find((u) => u.id == order.userId);
        const productsArray = order.productsArray.map((product) => {
            const productItem = Product.find((p) => p.id == product.id);
            return {
                ...productItem,
                quantity: product.quantity,
            }
        });
        order = {
            ...order,
            user,
            productsArray,
        }
        delete order.userId;
        return okResponse(res, 'the order is fetched succesfully', order);
    } catch (err) {
        next(err);
    }
}