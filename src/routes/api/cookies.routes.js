import { Router } from "express";
const routerCookie = Router();

/*****************************************************************GET*************************************************************/
routerCookie.get("/getUserCookie", (req, res) => {
  const userCookie = req.signedCookies.UserCookie;
  userCookie ? res.send({ email: userCookie.email }) : res.send({ email: "" });
});

routerCookie.get("/getSessionCookie", (req, res) => {
  try {
    const sessionCookie = req.signedCookies.connect.sid
      ? req.signedCookies.connect.sid
      : null;
    if (sessionCookie) {
      res.send({ data: sessionCookie });
    } else {
      res.send({ data: "" });
    }
  } catch (error) {
    console.error("Error reading session " + error);
  }
});

/*****************************************************************POST*************************************************************/
routerCookie.post("/setUserCookie", (req, res) => {
  const { user, timer } = req.body;
  const time = timer ? timer : null;
  res.cookie(
    "UserCookie",
    { email: user },
    {
      maxAge: time,
      signed: true,
    }
  );
  res.send({ email: user });
});

/*****************************************************************DELETE*************************************************************/
routerCookie.delete("/delCookie", (req, res) => {
  const nameCookie = req.body.name;
  res.clearCookie(nameCookie);
  res.send("Cookie borrada");
});

export default routerCookie;
