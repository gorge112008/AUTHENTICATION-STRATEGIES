/*import passport from "passport";
import local from "passport-local";
import { UserFM } from "../dao/Mongo/classes/DBmanager";
import { createHash, isValidPassword } from "../../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, passwrod, done) => {
        const { User, Password, repeatPassword } = req.body;
        try {
            let user = await UserFM.getUserUnique({
                email: User,
              });
            if (user) {
                const err = { error: "The user already exists!" };
                return done(err, null);
            }
        } catch (error) {
            const err = { error: "An error has occurred with your credentials!" };
            return done(err+error);
        }
      }
    )
  );
};

export default initializePassport;*/