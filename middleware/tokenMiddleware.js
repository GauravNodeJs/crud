import MyResponse from '../helpers/message.js'
import jwt from 'jsonwebtoken'
const tokenMiddleware = (req, res, next) => {

    let authorization = req.headers.authorization
    console.log(req.headers)
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

export default tokenMiddleware;