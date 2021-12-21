const express = require('express')
const bcrypt = require('bcrypt')

const routes = express.Router()

const port = require('../models/port')
const order = require('../models/order')
const distances = require('../models/distance')

/**
 * Object Manipulation functions
 */

const getActivePorts = async() =>{
    const responseData = port.find({isActive: 1})
    return responseData
}

const getAllPorts = async() =>{
    const responseData = port.find()
    return responseData
}

const allOrders = async() =>{
    const responseData = order.find()
    return responseData
}

const ordersByUser = async(userID)=>{
    const responseData = order.find({userID : userID})
    return responseData
}

// Routes

/**
 * Ports
 */
routes.get('/getAllPorts', async (req, res) => {
    res.json(await getAllPorts())
})

routes.get('/getActivePorts',async(req,res) =>{
    res.json(await getActivePorts())
})

routes.get('/getPort/:portID', async(req, res) =>{
    const portID = req.params.portID
    const requestedPort = await port.findById(portID)

    res.json(requestedPort) 
})

routes.post('/createPort', async(req, res) =>{
    const portData = req.body

    const newPort = new port(portData)
    
    newPort.save()

    res.json({
        message: 'Port Added Successfully.'
    })
})

routes.put('/updatePort/:portID', async(req,res) =>{

    const portID = req.params.portID
    const updateQuery = req.body

    await port.findByIdAndUpdate(portID, updateQuery, {upsert: true})

    res.json({
        message: 'Port Updated Successfully.'
    })
})

/**
 * Orders
 */
routes.get('/getAllOrders', async(req, res) =>{
    res.json(await allOrders())
})

routes.get('/getOrdersByUser/:userID', async(req,res) =>{
    const userID = req.params.userID
    res.json(await ordersByUser(userID))
})

routes.get('/getOrder/:orderID', async(req,res)=>{
    const orderID = req.params.orderID
    const requestedOrder = order.findById(orderID)
    res.json(requestedOrder)
})

routes.post('/newOrder', async(req, res) =>{
    const orderData = req.body

    const order = new order(orderData)
    
    order.save()
    res.json({
        message: 'Order created Successfully.'
    })
})

routes.put('updateOrder/:orderID', async(req, res) =>{
    const orderID = req.params.orderID
    const updateQuery = req.body

    await order.findByIdAndUpdate(orderID, updateQuery, {upsert: true})

    res.json({
        message: 'Order Updated Successfully.'
    })
})

/**
 * Distances
 */

module.exports = routes;