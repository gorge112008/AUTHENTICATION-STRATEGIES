import { fileURLToPath } from "url";
import { dirname } from "path";
import brcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret";

export const createHash = (password) =>
  brcrypt.hashSync(password, brcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
  brcrypt.compareSync(password, user);

export const createToken = (user) => {
  const expirationTime= new Date();
  user.expirationTime=expirationTime;
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "600000" });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Authentication Error!" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
    if (err) return res.status(403).json({ error: "Expired or invalid authorization" });
    req.user = credentials.user;
    next();
  });
};

const __filename = fileURLToPath(import.meta.url); //Obtener la ruta absoluta del directorio actual
const __dirname = dirname(__filename);

export { __dirname };
