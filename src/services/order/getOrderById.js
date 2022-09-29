import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import Category from '../../helpers/db/category.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getOrderId(req, res, next) {
    try {
        const { id } = req.params;
        let order = Order.find((o) => o.id == id);
        if (!order) {
            return badRequestResponse(res, 'there is no order with this id');
        }
        const products = order.products.map((product) => {
            const productFound = Product.find(
                (productFound) => productFound.id === product.productId
            );
            delete productFound.quantity;
            productFound.category = Category.find(
                (c) => c.id === productFound.catId
            );
            delete productFound.catId;
            return {
                ...productFound,
                quantityTaken: product.quantityTaken,
            };
        });
        const user = User.find((u) => u.id == order.userId);
        order = {
            id: order.id,
            user,
            products,
        };
        return okResponse(res, 'product fetched succesfully', order);
    } catch (err) {
        next(err);
    }
}