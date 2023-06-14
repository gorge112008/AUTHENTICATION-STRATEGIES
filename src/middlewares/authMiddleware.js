import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
import { isValidPassword } from "../utils.js";

const auth = async (req, res, next) => {
  try {
    const { User, Password } = req.body;
    const response = await UserFM.getUserUnique({
      email: User,
    });
    if (response) {
      if (isValidPassword(Password, response.password)) {
        const { password, ...newResponse } = response;
        if (
          User === "adminCoder@coder.com" ||
          User === "adminJorge@coder.com" ||
          User === "adminAlhena@coder.com"
        ) {
          if (!req.session.admin) {
            req.session.admin = response;
            res.locals.admin = newResponse;
          }
          res.locals.admin = newResponse;
        } else if (!req.session.user) {
          req.session.user = response;
          res.locals.user = newResponse;
        } else {
          res.locals.user = newResponse;
        }
        next();
      } else {
        const err = { error: "Authentication Error!" };
        return res.status(401).json(err);
      }
    } else {
      const err = { error: "An error has occurred with your credentials!" };
      return res.status(404).json(err);
    }
  } catch (error) {
    const err = { error: "Internal Server Error" };
    return res.status(500).json(err);
  }
};

export default auth;
