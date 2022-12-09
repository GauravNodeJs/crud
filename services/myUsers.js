import User from "../models/users";
import MyResponse from "../helpers/message";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import MESSAGES from "../helpers/commonMessages";
import Quote from "../models/quotes";
class UserService {
  async registerAllUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        let resPayload = {
          message: MESSAGES.EMAIL_EXIST,
        };
        return MyResponse.error(res, resPayload, 409);
      }
      const myData = new User(req.body);
      myData.save();

      let resPayload = {
        message: MESSAGES.REGISTER_SUCCESS,
      };
      MyResponse.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return MyResponse.error(res, resPayload, 500);
    }
  }
  async loginUsers(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return MyResponse.error(res, resPayload, 401);
      }
      if (user.delete === true) {
        let resPayload = {
          message: MESSAGES.USER_NOT_FOUND,
        };
        return MyResponse.error(res, resPayload, 404);
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return MyResponse.error(res, resPayload, 401);
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      const resPayload = {
        message: MESSAGES.LOGIN_SUCCESS,
        payload: { token: token },
      };
      return MyResponse.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return MyResponse.error(res, resPayload, 500);
    }
  }
  async profile(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      const myMessage = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      let resPayload = {
        message: MESSAGES.PROFILE,
        payload: myMessage,
      };
      return MyResponse.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return MyResponse.error(res, resPayload, 500);
    }
  }
  async updateUser(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log(user);
      let resPayload = {
        message: MESSAGES.EMAIL_EXIST,
      };
      return MyResponse.error(res, resPayload, 409);
    }

    User.findByIdAndUpdate(req.user._id, req.body, { new: true })
      .select("firstName lastName email")

      .then((item) => {
        console.log(item);
        let resPayload = {
          message: MESSAGES.UPDATED_SUCCESS,
          payload: item,
        };
        return MyResponse.success(res, resPayload);
      })
      .catch((err) => {
        let resPayload = {
          message: MESSAGES.SOMETHING_WENT_WRONG,
        };
        return MyResponse.error(res, resPayload, 500);
      });
  }

  async softDelete(req, res) {
    try {
      const myId = req.user._id;
      const myUser = await User.findOne({ _id: myId });
      if (myUser.delete == true) {
        let resPayload = {
          message: MESSAGES.USER_NOT_FOUND,
        };
        return MyResponse.error(res, resPayload, 404);
      }
      const user = await User.findByIdAndUpdate(myId, { delete: true }).then(
        (item) => {
          let resPayload = {
            message: MESSAGES.DELETE_USER,
            payload: {},
          };
          return MyResponse.success(res, resPayload);
        }
      );
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return MyResponse.error(res, resPayload, 500);
    }
  }
  async addquotes(req, res) {
    try {
      const idUser = req.user._id;

      let attribute = {
        tittle: req.body.tittle,

        userId: idUser,
      };
      let myQuotes = new Quote(attribute);

      myQuotes
        .save()
        .then((value) => {
          let resPayload = {
            message: MESSAGES.QUOTS_SUCCESS,
            payload: value.tittle,
          };
          return MyResponse.success(res, resPayload);
        })
        .catch((err) => {
          let resPayload = {
            message: err,
            payload: {},
          };
          return MyResponse.error(res, resPayload);
        });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload: {},
      };
      return MyResponse.error(res, resPayload, 500);
    }
  }
  async getQuotes(req, res) {
    try {
      const user = req.user._id;
      const userData = await User.aggregate([
        {
          $lookup: {
            from: "quotes",
            localField: "_id",
            foreignField: "userId",
            as: "userQuotes",
          },
        },
        {
          $project: {
            _id: 0,
            by: "$firstName",
            userQuotes: {
              tittle: 1,
            },
          },
        },
      ]);
      let resPayload = {
        message: MESSAGES.YOUR_QUOTES,
        payload: userData,
      };
      return MyResponse.success(res, resPayload);
    } catch (err) {
      const resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload: {},
      };
      return MyResponse.error(res, resPayload);
    }
  }
}

export default new UserService();
