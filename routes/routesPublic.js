const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const rutas = express.Router();

const Usuario = require("../models/Usuario");
const DetalleUsuario = require("../models/DetalleUsuario");

rutas.post("/login", async (req, res) => {
  const correo = req.body.correo;

  const usuario = await Usuario.findOne({ correo: correo });

  if (!usuario) {
    return res.json({
      mensaje: "User does not exist",
    });
  } else {
    const password = req.body.pass;

    const validacion_pass = await bcrypt.compare(password, usuario.pass);

    if (!validacion_pass) {
      return res.json({
        mensaje: "Password incorrect",
      });
    }
  }

  const token = jwt.sign(
    {
      nombre: usuario.nombre,
      id: usuario._id,
    },
    process.env.SECRETO_JWT
  );

  res.json({
    message: "Welcome",
    token: token,
  });
});

rutas.post("/crear_detalle_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const detalle_usuario = new DetalleUsuario({
    id_usuario: id_usuario,
    fecha_nacimiento: req.body.fecha_nacimiento,
  });

  await detalle_usuario.save();

  res.json({
    mensaje: "detalle de usuario creado correctamente",
  });
});

rutas.get("/get_detalle_usuario_by_id/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;
  const detalle_usuario = await DetalleUsuario.findOne({
    id_usuario: id_usuario,
  });
  res.json(detalle_usuario);
});

rutas.get("/get_detalles_usuarios", async (req, res) => {
  const usuarios = await Usuario.find(); //tener todos los usuarios

  return await res.json(
    usuarios.map(async (usuario) => {
      const detalle_usuario = await DetalleUsuario.findOne({
        id_usuario: usuario._id.toString(),
      });
      usuario["detalle"] = detalle_usuario;

      return usuario;
    })
  );
});

module.exports = rutas;
