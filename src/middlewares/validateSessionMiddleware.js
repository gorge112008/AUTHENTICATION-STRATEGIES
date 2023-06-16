
const validateSession = async (req, res, next) => {
  try {
    const session = req.session;
    if(session.user||session.admin){
      if (session.user) {
        res.locals.resUser={rol:"USER",email:session.user.email};
        const { password, ...newSession }=session.user;
        res.locals.resSession=newSession;
      }else if(session.admin){
        res.locals.resUser={rol:"ADMIN",email:session.admin.email};
        const { password, ...newSession }=session.admin;
        res.locals.resSession=newSession;
      }
      next();
    }else{
      return res.status(401).render("redirection", { isLogin: true });
    }
  } catch (error) {
    next(error);
  }
};

export default validateSession;
