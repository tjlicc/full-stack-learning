const logger = require('./logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const token = getTokenFrom(req)
  req.token = token
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  logger.error(err)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(err)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}