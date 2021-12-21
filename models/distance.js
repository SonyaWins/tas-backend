const dbHelper = require('../database/dbHelper')

const Schema = dbHelper.Schema

const distanceSchema = new Schema({
    originPortID: String,
    destinationPortID: String,
    distance: Number,
    unitPrice: Number
})

const distance = dbHelper.model('distances', distanceSchema)

module.exports = distance