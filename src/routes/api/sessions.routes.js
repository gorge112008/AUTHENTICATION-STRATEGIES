import { Router } from "express";
import { UserFM } from "../../dao/Mongo/classes/DBmanager.js";
import auth from "../../middlewares/authMiddleware.js";
import checkActiveSession from "../../middlewares/checkSession.js";

const routerSessions = Router();

/*****************************************************************GET*************************************************************/
routerSessions.get("/session", (req, res) => {
  try {
    const session = req.session;
    if (session.user || session.admin) {
      const admin = req.session.admin;
      const user = req.session.user;
      const userName = admin ? admin.first_name : user.first_name;
      let msj;
      req.session.counter++;
      msj = `WELCOME BACK ${userName.toUpperCase()}, THIS IS YOUR ${
        req.session.counter
      } INCOME.`;
      res.status(200).json({ msj: msj, confirm: true, session: session });
    } else {
      res.status(200).json({ confirm: false, session: null });
    }
  } catch (error) {
    console.error("Error reading session " + error);
  }
});

routerSessions.get("/logout", (req, res) => {
  res.clearCookie("connect.sid");
  res.clearCookie("SessionCookie");
  req.session.destroy((err) => {
    if (err) {
      res.send("Failed to sign out");
    } else {
      const msj = `YOU HAVE ENDED YOUR SESSION SUCCESSFULLY`;
      res.status(200).json(msj);
    }
  });
});

/*****************************************************************POST*************************************************************/
routerSessions.post("/login",checkActiveSession,auth, (req, res) => {
  try {
    const admin = req.session.admin;
    const user = req.session.user;
    const userName = admin ? admin.first_name : user.first_name;
    const session = req.session;
    const msj = `WELCOME ${userName.toUpperCase()}`;
    req.session.counter = 1;
    res.status(200).json({ success: msj, session: session });
  } catch (error) {
    console.error("Not exist any session: " + error);
  }
});

routerSessions.post("/signup", async (req, res) => {
  const newUser = req.body;
  try {
    const response = await UserFM.addUser(newUser);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerSessions;
