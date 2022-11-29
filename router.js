import UserService from "./services/myUsers.js";
import bodyParser from 'express'
import JoiMiddleware from './middleware/schemaMiddleware.js'
import tokenMiddleware from "./middleware/tokenMiddleware.js";

    const get =(app)=>{
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())
        app.post("/register",JoiMiddleware,UserService.registerAllUser);
        app.post('/login',JoiMiddleware,UserService.loginUsers);
        app.get('/profile',tokenMiddleware,UserService.profile);
  }
  export default get

  