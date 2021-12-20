const mongoose = require('../db/Basedatos')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    username: String,
    role: Number,
    passwordHash: String
})

const user = mongoose.model('users', usuarioSchema)

module.exports = user