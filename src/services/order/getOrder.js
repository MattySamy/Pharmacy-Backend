import Product from '../../helpers/db/product.db.js';
import Order from '../../helpers/db/order.db.js';
import User from '../../helpers/db/user.db.js';
import Category from '../../helpers/db/category.db.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getOrder(req, res, next) {
    try {
        const orders = Order.map((order) => {
            const user = User.find((user) => user.id === order.userId);
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
            return {
                id: order.id,
                user,
                products,
            };
        });
        return okResponse(res, 'order fetched succesfully', orders);
    } catch (err) {
        next(err);
    }
}