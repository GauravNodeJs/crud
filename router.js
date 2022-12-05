import UserService from "./services/myUsers.js";
import bodyParser from 'express'
import ValidateMiddleware from './middleware/schemaMiddleware.js'
import MiddlewareToken from "./middleware/tokenMiddleware.js";
import upload from './helpers/multerHelper'
import { nextTick } from "process";


const get = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.post("/register", UserService.registerAllUser);
    app.post('/login', ValidateMiddleware.JoiMiddleware, UserService.loginUsers);
    app.get('/profile', MiddlewareToken.tokenMiddleware, UserService.profile);
    app.put('/updateUser', [MiddlewareToken.tokenMiddleware, ValidateMiddleware.JoiMiddleware], UserService.updateUser)
    app.delete('/deleteUser', MiddlewareToken.tokenMiddleware, UserService.softDelete)
    app.post('/addfile',(req,res,next)=>{
        upload(req,res,(err)=>{
            if (err) {
                res.status(500).send({message:"cannot upload"});
            } else{
                res.send(req.files) 
            }   
        })  
    })
}
export default get

