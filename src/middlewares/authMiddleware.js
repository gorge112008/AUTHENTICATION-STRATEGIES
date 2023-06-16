const auth = async (req, res, next) => {
  try {
    if (req.user && !req.user.error) {
      if (
        req.user.email === "adminCoder@coder.com" ||
        req.user.email === "adminJorge@coder.com" ||
        req.user.email === "adminAlhena@coder.com"
      ) {
        req.session.admin = req.session.admin || req.user;
      } else {
        req.session.user = req.session.user || req.user;
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
