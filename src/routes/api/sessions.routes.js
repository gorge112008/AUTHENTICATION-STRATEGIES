import { Router } from "express";
import auth from "../../middlewares/authMiddleware.js";
import passport from "passport";

const routerSessions = Router();

/*****************************************************************GET*************************************************************/
routerSessions.get("/sessions/session", (req, res) => {
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

routerSessions.get(
  "/sessions/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
  async (req, res) => {}
);

routerSessions.get(
  "/sessions/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),auth,
  async (req, res) => {
    try {
      const session = req.user;
      req.session.counter = 1;
      const role = req.session.admin ? "admin" : "user";
      const userName = req.user.first_name;
      const msj = `WELCOME ${userName.toUpperCase()}`;
      const login={msj:msj,role:role}
      res.cookie("login",login);
      res.redirect("/github");
    } catch (error) {}
  }
);

routerSessions.get("/sessions/logout", (req, res) => {
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

routerSessions.get("/sessions/failregister", (req, res) => {
  const err = { error: "The user is already registered!" };
  res.status(409).json(err);
});

routerSessions.get("/sessions/faillogin", (req, res) => {
  const err = { error: "An error has occurred with your credentials!" };
  res.status(404).json(err);
});

routerSessions.get("/sessions/failforgot", (req, res) => {
  const err = { error: "An error has occurred with your credentials!" };
  res.status(404).json(err);
});

/*****************************************************************POST*************************************************************/
routerSessions.post(
  "/sessions/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),auth,
  async (req, res) => {
    try {
      const role = req.session.admin ? "admin" : "user";
      const userName = req.user.first_name;
      const session = req.user;
      const msj = `WELCOME ${userName.toUpperCase()}`;
      req.session.counter = 1;
      res.status(200).json({ success: msj, session: session, role: role});
    } catch (error) {
      console.error("Not exist any session: " + error);
    }
  }
);

routerSessions.post(
  "/sessions/signup",
  passport.authenticate("signup", {
    failureRedirect: "/api/sessions/failregister",
  }),
  async (req, res) => {
    try {
      if (req.user && !req.user.error) {
        const msj = {
          success: `Email ${req.user.email} successfully registered`,
          data: accessToken,
        };
        res.status(201).json(msj);
      } else {
        const err = { error: "An error occurred with the registration" };
        res.status(400).json(err);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

routerSessions.post(
  "/sessions/forgot",
  passport.authenticate("forgot", {
    failureRedirect: "/api/sessions/failforgot",
  }),
  async (req, res) => {
    try {
      const msj = { success: "Success!" };
      res.status(200).json(msj);
    } catch (error) {}
  }
);

export default routerSessions;
