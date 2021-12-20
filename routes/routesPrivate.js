const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const rutas = express.Router()

const Fruta = require("../models/Fruta")
const Usuario = require("../models/Usuario")

const get_frutas = async () => {
    const datos = await Fruta.find()
    return datos
}

rutas.get('/get_frutas', async (req, res) => {
    res.json(await get_frutas())
})

rutas.post('/crear_fruta', async (req, res) => {
    const datos_fruta = req.body

    const fruta = new Fruta(datos_fruta)
    await fruta.save()

    res.json({
        mensaje: 'fruta creada correctamente'
    })
})

rutas.get('/get_fruta_by_id/:id_fruta', async (req, res) => {

    const id_fruta = req.params.id_fruta

    const fruta = await Fruta.findById(id_fruta)

    res.json(fruta)
})

rutas.delete('/eliminar_fruta/:id_fruta', async (req, res) => {

    const id_fruta = req.params.id_fruta

    const fruta = Fruta.findById(id_fruta)
    await fruta.deleteOne()

    res.json({
        mensaje: 'fruta eliminada correctamente'
    })
})

rutas.get('/get_usuarios', async (req, res) => {
    const usuarios = await Usuario.find()

    res.json(usuarios)
})

rutas.post('/crear_usuario', async (req, res) => {
    const datos_usuario = req.body

    const salto = await bcrypt.genSalt(10)

    const password = await bcrypt.hash(datos_usuario.pass, salto)

    const nuevo_usuario = {
        nombre: datos_usuario.nombre,
        correo: datos_usuario.correo,
        celular: datos_usuario.celular,
        role: datos_usuario.role,
        pass: password
    }

    const usuario = new Usuario(nuevo_usuario)
    await usuario.save()

    res.json({
        mensaje: 'usuario creado correctamente'
    })
})

module.exports = rutas