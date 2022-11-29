import User from "../models/users.js";
import joi from 'joi'
import MyResponse from '../helpers/message.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
class UserService {
    registerAllUser(req, res) {
        const myData = new User(req.body);
        myData.save()
            .then(item => {

                let resPayload = {
                    message: 'Successfully added',
                    payload: item
                };
                return MyResponse.success(res, resPayload)
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    }
    async loginUsers(req, res) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("incorrect Email -ID");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("incorrect password");
        const token = jwt.sign({ _id: user._id }, 'shhhhh');
        return res.status(200).send({ status: "login success", you: user, Token: token })
    }
    async profile(req, res) {
        try {
            const userId = req.user._id
            const user = await User.findById(userId)
            let resPayload = {
                message: 'profile info',
                payload: user
            };
            return MyResponse.success(res, resPayload)
        }
        catch (err) {
            let resPayload = {
                message: err.message,
                payload: {}
            };
            return MyResponse.error(res, resPayload)
        }

    }
}
export default new UserService()