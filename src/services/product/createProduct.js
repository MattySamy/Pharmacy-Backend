import Product from '../../helpers/db/product.db.js';
import Category from '../../helpers/db/category.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function createProduct(req, res) {
    try {
        let { name, quantity, catId } = req.body;
        const categoryId = Category.find((c) => c.id == catId);
        if (!name || !quantity || !catId) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (Product.some((product) => product.name === name)) {
            return badRequestResponse(res, 'Product already exists');
        }
        if (!catId) {
            return badRequestResponse(res, 'Category not found');
        }
        const product = {
            id: Product.length + 1,
            name,
            quantity,
            categoryId,
        }
        Product.push(product);
        return okResponse(res, 'Product created successfully', product);
    } catch (err) {
        return badRequestResponse(res, err.message);
    }
}