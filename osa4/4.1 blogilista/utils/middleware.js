const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  if ( process.env.NODE_ENV !== 'test' ){
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
  }
  
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    const token = authorization.replace('Bearer ', '')  
    //console.log("token", token)
    request.token = token
  }  
  next()
  return request
}

const userExtractor = (request, response, next) => {
  //console.log("user extraction") 
  const decodedToken = jwt.verify(request.token, process.env.SECRET) 
  if (!decodedToken.id) {    
    return response.status(401).json({ error: 'token invalid' })  
  }
  request.user = {id: decodedToken.id, username: decodedToken.username}
  //console.log(request.user)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if ( process.env.NODE_ENV !== 'test' ){
    logger.error(error.message)
  }

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && 
    error.message.includes('E11000 duplicate key error')) {    
      return response.status(400).json({ error: 'expected `username` to be unique' })  
  } else if (error.name ===  'JsonWebTokenError') {    
    return response.status(400).json({ error: 'token missing or invalid' })  
  } else if (error.name === 'TokenExpiredError') {    
    return response.status(401).json({ error: 'token expired' })  
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}