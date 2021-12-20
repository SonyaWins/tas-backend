require('dotenv').config()

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const verifyToken = require('./core/tokenValidator');

const generalRoutes = require("./routes/routesPrivate.js");
const discoveryRoutes = require("./routes/routesPublic.js")

const app = express();
const port = process.env.port || 8000
const cors_config = {
  origin: "*",
};
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + "/public"));

app.use("/api", cors(cors_config), jsonParser, discoveryRoutes);
app.use('/api', cors(cors_config), jsonParser, verifyToken, generalRoutes);

//app.use((req, res) => {
//    res.status(404).render(__dirname + '/public/' +"404.html")
//})
app.use((req, res) => {
  res.json({
    mensaje: "Invalid URL",
  });
});

app.listen(port, () => {
  console.log("Server Ready");
});