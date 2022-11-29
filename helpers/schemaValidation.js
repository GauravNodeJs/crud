import joi from "joi";
const schemaValidator = (route, method) => {
    let obj = {}
    switch (method) {

        case 'post':
            obj = {
                '/register': validation,
                '/login': loginValidation
            }
            return obj[route]
            break;


    }

}
export default schemaValidator;




const validation = joi.object({
    firstName: joi.string().min(3).max(25).trim(true).required(),
    lastName: joi.string().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    email: joi.string().email().required()

});


const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).trim(true).required(),

});