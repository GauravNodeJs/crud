import UserService from "./services/myUsers.js";
import bodyParser from 'express'
import ValidateMiddleware from './middleware/schemaMiddleware.js'
import MiddlewareToken from "./middleware/tokenMiddleware.js";

    const get =(app)=>{
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())
        app.post("/register",ValidateMiddleware.JoiMiddleware,UserService.registerAllUser);
        app.post('/login',ValidateMiddleware.JoiMiddleware,UserService.loginUsers);
        app.get('/profile',MiddlewareToken.tokenMiddleware,UserService.profile);
        app.put('/updateUser',[MiddlewareToken.tokenMiddleware,ValidateMiddleware.JoiMiddleware],UserService.updateUser)
        app.delete('/deleteUser',MiddlewareToken.tokenMiddleware,UserService.softDelete)
  }
  export default get

  