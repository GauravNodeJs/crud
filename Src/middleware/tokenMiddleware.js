import MyResponse from '../helpers/response'
import jwt from 'jsonwebtoken'
class MiddlewareToken {
    tokenMiddleware(req, res, next) {

        let authorization = req.headers.authorization
        const token = authorization.replace("Bearer ", "")
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
        }
        catch (err) {
            let resPayload = {
                message: err.message,
                payload: {}
            };
            return MyResponse.error(res, resPayload, 401)
        }

        next();
    }
}


export default new MiddlewareToken;