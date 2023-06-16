import { Router } from "express";
import middlewareInitProducts from "../middlewares/initProductsMiddleware.js";
import middlewareInitMessages from "../middlewares/initMessagesMiddleware.js";
import middlewareInitCart from "../middlewares/initCartMiddleware.js";
import validateSession from "../middlewares/validateSessionMiddleware.js";
import publicController from "../controllers/publicController.js";
import privateController from "../controllers/privateController.js";

const routerViews = Router();

routerViews.get("/", publicController.login);

routerViews.get("/login", publicController.login);

routerViews.get("/signup", publicController.signup);

routerViews.get("/forgot", publicController.forgot);

routerViews.get("/github", publicController.github)

routerViews.get("/profile", validateSession, publicController.profile);

routerViews.get(
  "/home",
  validateSession,
  middlewareInitProducts,
  publicController.home
);

routerViews.get(
  "/realtimeproducts",
  validateSession,
  middlewareInitProducts,
  privateController.realtimeproducts
);

routerViews.get(
  "/realtimeproducts/:pid",
  validateSession,
  middlewareInitProducts,
  privateController.realtimeproducts
);

routerViews.get(
  "/products",
  validateSession,
  middlewareInitProducts,
  publicController.products
);

routerViews.get(
  "/products/:pid",
  validateSession,
  middlewareInitProducts,
  publicController.products
);

routerViews.get(
  "/cart",
  validateSession,
  middlewareInitCart,
  publicController.carts
);

routerViews.get(
  "/cart/:cid",
  validateSession,
  middlewareInitCart,
  publicController.carts
);

routerViews.get(
  "/chat",
  validateSession,
  middlewareInitMessages,
  publicController.chat
);

export default routerViews;
