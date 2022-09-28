import User from '../../helpers/db/user.db.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function createUser(req, res) {
    try {
        let { name, email, phone, age } = req.body;
        if (!name || !email || !phone) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (User.some((user) => user.email === email)) {
            return badRequestResponse(res, 'User already registered');
        }
        const user = {
            id: User.length + 1,
            name,
            email,
            phone,
            age,
        };
        User.push(user);
        return okResponse(res, 'User registered successfully', user);
    } catch (error) {
        return badRequestResponse(res, error.message);
    }
}