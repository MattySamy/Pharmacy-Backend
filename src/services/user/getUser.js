import User from '../../helpers/db/user.db.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getUser(req, res, next) {
    try {
        return okResponse(res, 'User fetched successfully', User);
    } catch (error) {
        next(error);
    }
}