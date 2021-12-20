const dbHelper = require("mongoose");

const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const collectionName = process.env.collectionName;

const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@servidor.dwcvs.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

dbHelper
  .connect(dbURI)
  .then(() => console.log("Database Online and Ready"))
  .catch((e) => console.log("Error: ", e));

module.exports = dbHelper