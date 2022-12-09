import UserService from "../services/myUsers";
import bodyParser from 'express'
import ValidateMiddleware from '../middleware/schemaMiddleware'
import MiddlewareToken from "../middleware/tokenMiddleware.js";
import upload from '../helpers/multerHelper'



const get = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.post("/register", UserService.registerAllUser);
    app.post('/login', ValidateMiddleware.JoiMiddleware, UserService.loginUsers);
    app.get('/profile', MiddlewareToken.tokenMiddleware, UserService.profile);
    app.put('/updateUser', [MiddlewareToken.tokenMiddleware, ValidateMiddleware.JoiMiddleware], UserService.updateUser)
    app.delete('/deleteUser', MiddlewareToken.tokenMiddleware, UserService.softDelete)
    app.post('/addfile',UserService.addFile)
    app.post('/addQuote',MiddlewareToken.tokenMiddleware,UserService.addquotes)
    app.get('/getQuote',MiddlewareToken.tokenMiddleware,UserService.getQuotes)
}
export default get

