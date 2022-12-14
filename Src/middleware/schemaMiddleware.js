import MyResponse from '../helpers/response'
import schemaValidator from "../helpers/schema-validator"
class ValidateMiddleware {
    JoiMiddleware(req, res, next) {
        let myRoute = req.route.path
        let myMethod = req.method.toLowerCase()
        let schema = schemaValidator(myRoute, myMethod)
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let myValue = error.details.map((value) => {
                let myOk = value.message.replace(/[\,"]/g, '');
                let o = {};
                Object.assign(o, { message: myOk, path: value.path[0] });
                return o
            })
            let resPayload = {
                message: 'Validation Error',
                payload: myValue
            };
            return MyResponse.error(res, resPayload)
        }
        next();
    }
}


export default new ValidateMiddleware;