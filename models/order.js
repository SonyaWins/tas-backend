const dbHelper = require('../database/dbHelper.js')

const Schema = dbHelper.Schema

const orderSchema = new Schema({
    originPortID: String,
    destinationPortID: String,
    orderID: String,
    orderDescription: String,
    orderWeight: Number,
    containerMeasures: String,
    orderStatus: String
})

const order = dbHelper.model('orders', orderSchema)

module.exports = order