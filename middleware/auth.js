//function that has access to req res function (req res object)
//every time we hit an endpoint we can fire off this function and see if there is a token in the req header
//we use the token to access user's information
const jwt = require('jsonwebtoken');
const config = require('config');

//when you have a middleware function, always have a next so that we may proceed to the next middleware function
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //x auth token is the key in the header where token is located

  //if not token, return error
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    //token is the jwt and the jwtSecret was a part of the jwt when first created
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //assign the payload which has an id (decoded.user) to req.user so we can access it on the next step
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
