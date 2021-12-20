const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token-jwt')
    if (!token) return res.status(401).json({ error: 'Access Denied' })
    
    try {
        const verified = jwt.verify(token, process.env.jwtSecret)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error: 'Invalid Token'})
    }
}

module.exports = verifyToken;