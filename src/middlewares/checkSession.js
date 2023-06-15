import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
const checkSession = async (req, res, next) => {
 try {
    const { User} = req.body;
    const response = await UserFM.getUserUnique({
      email: User,
    });
    if (response) {
      req.sessionStore.all((error, sessions) => {
        if (error) {
          const err= { error: "Internal Server Error> "+error };
          return res.status(500).json(err);
        }
        const adminSessions = sessions.filter((session) => session.admin);
        const userSessions = sessions.filter((session) => session.user);
        const activeAdminSessions = adminSessions.filter(
          (session) => session.admin.email == response.email
        );
        const activeUserSessions = userSessions.filter(
          (session) => session.user.email == response.email
        );
        if (activeAdminSessions.length > 0 || activeUserSessions.length > 0) {
          const err = { error: "The mail already has the active session. Please try again later (10 min max.)" };
          return res.status(409).json(err);
        }else{
          res.locals.session = response;
          next();
        }
      });
    }else{
      const err = { error: "An error has occurred with your credentials!" };
      return res.status(404).json(err);
    }
  }catch (error) {
    const err= { error: "Internal Server Error> "+error };
    return res.status(500).json(err);
  }
};

export default checkSession;
