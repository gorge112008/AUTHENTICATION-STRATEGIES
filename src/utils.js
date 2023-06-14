import {fileURLToPath} from 'url';
import { dirname } from 'path';
import brcrypt from 'bcrypt';

export const createHash = password => brcrypt.hashSync(password, brcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => brcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url); //Obtener la ruta absoluta del directorio actual
const __dirname = dirname(__filename);

export {__dirname};