import dotenv from "dotenv";

dotenv.config();

const { env } = process;
const { USER_MONGO, PASS_MONGO, DB_MONGO, PORT } = env;

export default {
  mongo: {
    port: PORT || 8080,
    DB_USER: USER_MONGO,
    DB_PASS: PASS_MONGO,
    DB_NAME: DB_MONGO,
    CONNECTION_URL: `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@codercluster.xq93twh.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`,
  },
};
