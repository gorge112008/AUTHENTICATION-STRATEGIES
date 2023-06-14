import { UserFM } from "../dao/Mongo/classes/DBmanager.js";
const checkSession = async (req, res, next) => {
 try {
    const { User, Password } = req.body;
    const response = await UserFM.getUserUnique({
      email: User,
      password: Password,
    });
    req.sessionStore.all((error, sessions) => {
      if (error) {
        console.error("Error al obtener las sesiones:", error);
        return res.status(500).json({ error: "Internal Server Error" });
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
        next();
      }
    });
  }catch (error) {
    const err= { error: "Internal Server Error" };
    return res.status(500).json(err);
  }
};

export default checkSession;
