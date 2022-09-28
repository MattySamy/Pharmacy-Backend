import User from '../../helpers/db/user.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = User.find((u) => u.id == id);
        if (!user) {
            return badRequestResponse(res, 'User not found');
        }
        return okResponse(res, 'User found succesfully', user);
    } catch (error) {
        return badRequestResponse(res, error.message);
    }
}