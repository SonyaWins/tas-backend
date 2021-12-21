require('dotenv').config()
/**
 * Imports
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const verifyToken = require('./core/tokenValidator');

/**
 * Configuracion de inicio del server de Express
 */
const app = express();
const port = process.env.port || 8000
const cors_config = {
  origin: "*",
};

/**
 * Configurar todas la respuestas en las peticiones en JSON.
 */
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * Usar los templates del directorio public en HTML para rendeizar peticiones hechas de una interfaz grafica.
 */

// TO-DO  Anadir mas templates sobre el otro conjunto de peticiones en el sector privado. Se recomienda Swagger
app.use(express.static(__dirname + "/public"));

/**
 * Importar las rutas, las expuestas en el lado publico, luego las expuestas en el lado privado de la data
 */
const generalRoutes = require("./routes/routesPrivate.js");
const discoveryRoutes = require("./routes/routesPublic.js")
/**
 * Cargar los archivos de ruta en el servidor de Express
 */
app.use("/api", cors(cors_config), jsonParser, discoveryRoutes);
app.use('/api', cors(cors_config), jsonParser, verifyToken, generalRoutes);
//app.use("/api", cors(cors_config), jsonParser, generalRoutes);

/*
app.use((req, res) => {
    res.status(404).render(__dirname + '/public/' +"404.html")
})
*/
app.use((req, res) => {
  res.json({
    mensaje: "Invalid URL",
  });
});

app.listen(port, () => {
  console.log("Server Ready");
});