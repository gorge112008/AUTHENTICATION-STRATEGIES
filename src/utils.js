import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url); //Obtener la ruta absoluta del directorio actual
const __dirname = dirname(__filename);

export {__dirname};