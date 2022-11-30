import User from "../models/users";
import MyResponse from '../helpers/message'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import MESSAGES from "../helpers/commonMessages";
class UserService {
    async registerAllUser(req, res) {
        try{
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST,
                };
                return MyResponse.error(res, resPayload);
            }
            const myData = new User(req.body);
             myData.save()
            

                let resPayload = {
                    message: MESSAGES.REGISTER_SUCCESS,
                };
                return MyResponse.success(res, resPayload)
            }
               catch(err) {
                console.log(err)
                let resPayload = {
                    message: MESSAGES.EMAIL_EXIST,
                };
                return MyResponse.error(res, resPayload);
            };
    }
    async loginUsers(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                let resPayload = {
                    message: MESSAGES.INVALID_CREDENTIALS,
                };
                return MyResponse.error(res, resPayload);
            }
            if (user.delete === true) {
                let resPayload = {
                    message: MESSAGES.USER_NOT_FOUND
                };
                return MyResponse.error(res, resPayload);
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                let resPayload = {
                    message: MESSAGES.INVALID_CREDENTIALS,
                };
                return MyResponse.error(res, resPayload);
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
            const resPayload = {
                message: MESSAGES.LOGIN_SUCCESS,
                payload: { token: token }
            };
            return MyResponse.success(res, resPayload);
        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SOMETHING_WENT_WRONG
            };
            return MyResponse.error(res, resPayload);
        }

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
                message: MESSAGES.SOMETHING_WENT_WRONG,
            };
            return MyResponse.error(res, resPayload)
        }

    }
    async updateUser(req, res) {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            let resPayload = {
                message: MESSAGES.EMAIL_EXIST,
            };
            return MyResponse.error(res, resPayload)
        }

        User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('firstName lastName email')

            .then(item => {
                let resPayload = {
                    message: MESSAGES.UPDATED_SUCCESS,
                    payload: item
                };
                return MyResponse.success(res, resPayload)
            })
            .catch(err => {
                let resPayload = {
                    message: MESSAGES.NOT_UPDATED
                };
                return MyResponse.error(res, resPayload)
            });
    };

    async softDelete(req, res) {

        try {
            const myId = req.user._id
            const myUser = await User.findOne({ _id: myId })
            if (myUser.delete == true) {
                let resPayload = {
                    message: MESSAGES.USER_NOT_FOUND
                };
                return MyResponse.error(res, resPayload)
            }
            const user = await User.findByIdAndUpdate(myId, { delete: true })
                .then(item => {
                    let resPayload = {
                        message: MESSAGES.DELETE_USER,
                        payload: {}
                    };
                    return MyResponse.success(res, resPayload)
                })

        }
        catch (err) {
            let resPayload = {
                message: MESSAGES.SOMETHING_WENT_WRONG
            };
            return MyResponse.error(res, resPayload)
        }
    }

}


export default new UserService()