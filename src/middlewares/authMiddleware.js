import { isValidPassword } from "../utils.js";

const auth = async (req, res, next) => {
  try {
    const { Password } = req.body;
    const response = res.locals.session;
    if (isValidPassword(Password, response.password)) {
      delete response._doc.password; //IMPORTANT: delete password from response
      if (
        response.email === "adminCoder@coder.com" ||
        response.email === "adminJorge@coder.com" ||
        response.email === "adminAlhena@coder.com"
      ) {
        req.session.admin=req.session.admin||response;
      } else {
        req.session.user=req.session.user||response;
      }
      next();
    } else {
      const err = { error: "Authentication Error!" };
      return res.status(401).json(err);
    }
  } catch (error) {
    const err = { error: "Internal Server Error" };
    return res.status(500).json(err);
  }
};

export default auth;
