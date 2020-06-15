const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
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
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}