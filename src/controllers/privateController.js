let privateProducts;

const privateController = {
  realtimeproducts: (req, res) => {
    const { rol, email } = res.locals.resUser;
    privateProducts = res.locals.resProducts;
    if (rol == "ADMIN") {
      res.render("private/realtimeproducts", {
        rol: rol,
        user: email,
        body: privateProducts,
      });
    } else if (rol == "USER") {
      res.render("private/noAdmin", { isLogin: true });
    }
  },
};

export default privateController;
export { privateProducts };
