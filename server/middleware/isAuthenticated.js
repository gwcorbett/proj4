require('dotenv').config()
//This is to get the secret key from the .env file
const jwt = require('jsonwebtoken')
//This is to verify the token
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        //If authenticated, the token will be in the header

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
            //401 means unauthorized
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
            //If the token is valid, it will be returned
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //If the token is invalid, an error will be thrown

        if (!token) {
            const error = new Error('Not authenticated.')
            //
            error.statusCode = 401
            throw error
        }//

        next()
    }
}