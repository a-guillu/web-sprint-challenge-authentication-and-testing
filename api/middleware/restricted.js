const jwt = require('jsonwebtoken')
const secrets = require('../../configs/secret')

module.exports = async (req, res, next) => {
  
  /*

    IMPLEMENT
    
    1- On valid token in the Authorization header, call next.
    
    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".
    
    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".

  */
    const token = req.headers.authorization 
    

    if(token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
          next({status:401, message:"token is invalid"})
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
    } else {
      res.status(401).json({message: "token required"})
    }
};