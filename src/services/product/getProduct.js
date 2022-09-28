import Product from '../../helpers/db/product.db.js';
import Category from '../../helpers/db/category.db.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getProduct(req, res, next) {
    try {
        const products = Product.map((p) => {
            const category = Category.find((c) => c.id == p.catId);
            const product = {
                ...p,
                category,
            };
            delete product.catId;
            return product;
        });
        return okResponse(res, 'All Products Found succesfully', products);
    } catch (err) {
        next(err);
    }
}