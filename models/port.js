const dbHelper = require('../database/dbHelper')

const Schema = dbHelper.Schema

const portSchema = new Schema({
    locationName: String,
    isActive: Number
})

const port = dbHelper.model('ports', portSchema)

module.exports = port