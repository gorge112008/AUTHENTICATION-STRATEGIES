import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import routerProducts from "./routes/api/products.routes.js";
import routerCarts from "./routes/api/carts.routes.js";
import routerMessage from "./routes/api/chat.routes.js";
import routerUser from "./routes/api/users.routes.js";
import routerViews from "./routes/mainRouter.js";
import routerSessions from "./routes/api/sessions.routes.js";
import routerCookies from "./routes/api/cookies.routes.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import config from "./config/config.js";

const { DB_USER, DB_PASS, CONNECTION_URL } = config.mongo;

const app = express(); //Crear una aplicacion express

app.use(cookieParser("S3cr3tC0d3r"));
app.use(
  session({
    secret: "S3cr3tC0d3r",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: CONNECTION_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 600, //Segundos que dura la sesion activa (10 minutos).
    }),
  })
);
app.use(express.json()); //Configurar el servidor para que pueda entender los formatos JSON
app.use(express.urlencoded({ extended: true })); //Configurar el servidor para que pueda entender los formatos URL Encoded
app.use("/", routerViews); //Configurar el servidor para que pueda entender las rutas de las vistas
app.use(
  "/api",
  routerCarts,
  routerMessage,
  routerUser,
  routerCookies,
  routerProducts
); //Configurar el servidor para que pueda entender las rutas de la API
app.use("/sessions",routerSessions);

app.engine(
  //Configurar el servidor para que pueda entender el motor de plantillas
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars), //Permitir el acceso a los prototipos de Handlebars
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public")); //Configurar el servidor para que pueda entender la ruta de los archivos estaticos

const environment = async () => {
  await mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conexion a la base de datos exitosa");
    })
    .catch((error) => {
      console.log(`Error en la conexion a la base de datos: ${error.message}`);
    });
};

const isValidStartDate = () => {
  if (DB_USER && DB_PASS) return true;
  else return false;
};

isValidStartDate() && environment(); //Si las credenciales de la base de datos son validas, se inicia la aplicacion

export default app;
