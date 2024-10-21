const db_host = process.env.DB_HOST;
const db_pw = process.env.DB_PW;
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

module.exports = {
  CLIENT_ID: client_id,
  CLIENT_SECRET: client_secret,
  HOST: db_host,
  USER: db_user,
  PASSWORD: db_pw,
  DB: db_name,
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};