const dbHelper = require('../database/dbHelper')

const Schema = dbHelper.Schema

const orderSchema = new Schema({
    userID: String,
    originPortID: String,
    destinationPortID: String,
    orderID: String,
    orderDescription: String,
    orderWeight: Number,
    containerMeasures: String,
    orderStatus: String, 
    orderTotal: Number
})

const order = dbHelper.model('orders', orderSchema)

module.exports = order