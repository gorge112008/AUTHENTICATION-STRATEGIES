let publicProducts, publicMessages, publicCarts;

const publicController = {
  index: (req, res) => {
    res.render("public/index", { isLogin: true, style: "/css/index.css" });
  },
  login: (req, res) => {
    res.render("public/login", { isLogin: true, style: "/css/login.css" });
  },
  signup: (req, res) => {
    res.render("public/signup", { isLogin: true, style: "/css/signup.css" });
  },
  profile: (req, res) => {
    const { rol, email } = res.locals.resUser;
    const resSession = res.locals.resSession;
    res.render("public/profile", {
      rol: rol,
      user: email,
      body: resSession,
      style: "/css/profile.css",
    });
  },
  home: (req, res) => {
    const { rol, email } = res.locals.resUser;
    publicProducts = res.locals.resProducts;
    res.render("public/home", { rol: rol, user: email, body: publicProducts });
  },
  products: (req, res) => {
    const { rol, email } = res.locals.resUser;
    publicProducts = res.locals.resProducts;
    res.render("public/products", {
      rol: rol,
      user: email,
      body: publicProducts,
    });
  },
  carts: (req, res) => {
    const { rol, email } = res.locals.resUser;
    publicCarts = res.locals.resCarts;
    res.render("public/cart", { rol: rol, user: email, body: publicCarts });
  },
  chat: (req, res) => {
    const { rol, email } = res.locals.resUser;
    publicMessages = res.locals.resMessages;
    res.render("public/chat", { rol: rol, user: email, body: publicMessages });
  },
};

export default publicController;
export { publicProducts, publicMessages, publicCarts };
