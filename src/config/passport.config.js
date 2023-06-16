import passport from "passport";
import local from "passport-local";
import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
export const initializePassport = () => {
  passport.use(
    "signup",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const user = await UserFM.getUserUnique({
            email: username,
          });
          if (!user) {
            const newUser = {
              first_name: first_name,
              last_name: last_name,
              email: username,
              age: age,
              password: createHash(password),
            };
            const response = await UserFM.addUser(newUser);
            delete response._doc.password;
            return done(null, response);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: false, usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await UserFM.getUserUnique({
            email: username,
          });
          if (user) {
            if (isValidPassword(password, user.password)) {
              delete user._doc.password; //IMPORTANT: delete password from user
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "forgot",
    new LocalStrategy(
      { passReqToCallback: false, usernameField: "email" },
      async (username, password, done) => {
        try {
            const user = await UserFM.getUserUnique({
              email: username,
            });
            if (user) {
              const response = await UserFM.updateUser(username, {
                password: createHash(password),
              });
              delete response._doc.password;
              return done(null, response);
            } else {
              return done(null, false);
            }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const User = await UserFM.getUserUnique({
      _id: id,
    });
    done(null, User._doc);
  } catch (error) {
    done(error);
  }
});
