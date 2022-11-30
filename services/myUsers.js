import User from "../models/users";
import MyResponse from '../helpers/message'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import MESSAGES from "../helpers/commonMessages";
class UserService {
    registerAllUser(req, res) {
        const myData = new User(req.body);
        myData.save()
            .then(item => {

                let resPayload = {
                    message: MESSAGES.REGISTER_SUCCESS,
                };
                return MyResponse.success(res, resPayload)
            })
            .catch(err => {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST,
                };
                return MyResponse.error(res,resPayload);
            });
    }
    async loginUsers(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if (!user){
            let resPayload = {
                message: MESSAGES.LOGIN_ERROR,
            };
            return MyResponse.error(res,resPayload);
        } 

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword){
            let resPayload = {
                message: MESSAGES.LOGIN_ERROR,
            };
            return MyResponse.error(res,resPayload);
        } 
        const token = jwt.sign({ _id: user._id }, 'shhhhh');
        const resPayload = {
            message: MESSAGES.LOGIN_SUCCESS,
            payload: {token:token}
        };
        return MyResponse.success(res,resPayload);
    }
    async profile(req, res) {
        try {
            const userId = req.user._id
            const user = await User.findById(userId).select('firstName lastName email')
            let resPayload = {
                message: MESSAGES.PROFILE,
                payload: user
            };
            return MyResponse.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: err.message,
            };
            return MyResponse.error(res, resPayload)
        }

    }
     updateUser(req,res){
    User.findByIdAndUpdate(req.user._id,req.body,{new:true} ).select('firstName lastName email')
       .then(item => {
            let resPayload = {
                message : MESSAGES.UPDATED_SUCCESS,
                payload: item
            };
            return MyResponse.success(res,resPayload)
        })
        .catch(err => {
            let resPayload = {
                message : MESSAGES.UPDATED_ERROR,
            };
            return MyResponse.error(res,resPayload)
            });
      };
      softDelete(req,res){
        const user=req.user.id
        User.removeMany(user)
        try{
            let resPayload = {
                message : "deleted",
            };
            return MyResponse.success(res,resPayload)
        }
        catch(err){
            let resPayload = {
                message : "not deleted",
            };
            return MyResponse.error(res,resPayload)
        }
      }
      
        }
export default new UserService()