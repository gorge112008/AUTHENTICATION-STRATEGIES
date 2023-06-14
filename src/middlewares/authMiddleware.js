import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
const auth = async (req, res, next) => {
  try {
    const { User, Password } = req.body;
    const response = await UserFM.getUserUnique({
      email: User,
      password: Password,
    });
    if (response) {
      const { password, ...newResponse } = response;
      if (
        (response.email === "adminCoder@coder.com" &&
          response.password === "adminCod3r123") ||
        (response.email === "adminJorge@coder.com" &&
          response.password === "adminJ0rg3") ||
        (response.email === "adminAlhena@coder.com" &&
          response.password === "adminAlh3n@")
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
      return res.status(400).json(err);
    }
  } catch (error) {
    const err = { error: "Internal Server Error" };
    return res.status(500).json(err);
  }
};

export default auth;
