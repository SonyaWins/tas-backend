const dbHelper = require('../database/dbHelper.js')

const Schema = dbHelper.Schema

const portSchema = new Schema({
    locationName: String,
    isActive: Boolean
})

const port = dbHelper.model('ports', portSchema)

module.exports = port