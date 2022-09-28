import Product from '../../helpers/db/product.db.js';
import Category from '../../helpers/db/category.db.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getProductId(req, res, next) {
    try {
        const id = req.params.id;
        let product = Product.find((p) => p.id == id);
        if (!product) {
            return badRequestResponse(res, 'there is no product with that id');
        }
        const category = Category.find((c) => c.id == product.catId);
        product = {
            ...product,
            category,
        };
        delete product.catId;
        return okResponse(res, 'the product is fetched succesfully', product);
    } catch (err) {
        next(err);
    }
}