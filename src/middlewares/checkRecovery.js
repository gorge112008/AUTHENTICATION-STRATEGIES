import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
const checkRecovery = async (req, res, next) => {
  try {
    const { User, Password, repeatPassword } = req.body;
    let newPassword = createHash(Password);
    if (isValidPassword(repeatPassword, newPassword)) {
      const response = await UserFM.getUserUnique({
        email: User,
      });
      if (response) {
        if (isValidPassword(Password, response.password)) {
          const err = {
            error: "The new password must be different from the previous one!",
          };
          return res.status(400).json(err);
        } else {
          const newResponse = await UserFM.updateUser(User, {
            password: newPassword,
          });
          if (newResponse) {
            next();
          }
        }
      } else {
        const err = { error: "An error ocurred, contact the administrator!" };
        return res.status(404).json(err);
      }
    } else {
      const err = { error: "Passwords do not match!" };
      return res.status(400).json(err);
    }
  } catch (error) {
    const err = { error: "Internal Server Error" };
    return res.status(500).json(err);
  }
};

export default checkRecovery;
