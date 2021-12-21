const express = require('express')
const bcrypt = require('bcrypt')

const routes = express.Router()

const port = require('../models/port')
const order = require('../models/order')
const distance = require('../models/distance')
const user = require('../models/user')

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

const allRoutes = async() =>{
    const fullMap = distance.find()
    return fullMap
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
    
    await newPort.save()

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
    
    await order.save()
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

routes.get('/viewAllDistances', async(req, res) =>{
    res.json(await allRoutes())
})

routes.get('/viewDistance/:routeID', async(req, res) =>{
    const routeID = req.params.routeID
    const requestedRoute = distance.findById(routeID)
    res.json(requestedRoute)
})

routes.post('/addRoute', async(req,res)=>{
    const routeData = req.body

    const segment = new distance(routeData)
    
    await segment.save()
    res.json({
        message: 'Route Segment created Successfully.'
    })
})

routes.put('/updateRoute/:routeID', async(req,res) =>{
    const routeID = req.params.routeID
    const updateQuery = req.body

    await route.findByIdAndUpdate(routeID, updateQuery, {upsert: true})

    res.json({
        message: 'Route Updated Successfully.'
    })
})


// Relationships

routes.get('/getAvailableRoutes/:fromLocationID', async(req,res) =>{
    const locationID = req.params.fromLocationID
    const availableTripLocations = await distance.aggregate(
        [
            {   
                $match: { 
                    originPortID: locationID
                }
            },
            {
                $lookup: {
                    from: 'ports',
                    localField: 'destinationPortID',
                    foreignField: '_id',
                    as: 'locations'
                }
            } 
            
        ]
    )
    res.json(availableTripLocations)
})

//Users

routes.get('/getAllUsers', async (req, res) => {
    const users = await user.find()

    res.json(users)
})

routes.post('/createInternalUser', async (req, res) => {
    const userData = req.body

    const salt = await bcrypt.genSalt(10)

    const password = await bcrypt.hash(userData.passwordHash, salt)

    const newUser = {
        name: userData.name,
        username: userData.username,
        role: userData.role,
        passwordHash: password
    }

    const usuario = new user(newUser)
    await usuario.save()

    res.json({
        mensaje: 'User registered successfully'
    })
})

module.exports = routes;