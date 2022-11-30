import MyResponse from '../helpers/message'
import jwt from 'jsonwebtoken'
class MiddlewareToken{
    tokenMiddleware  (req, res, next) {

        let authorization = req.headers.authorization
        const token = authorization.replace("Bearer ", "")
        try {
            const decoded = jwt.verify(token, 'shhhhh')
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