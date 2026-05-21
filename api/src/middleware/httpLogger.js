const pinoHttp = require('pino-http');
const logger = require('../config/logger');

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.requestId,
  customProps: (req, res) => ({
    requestId: req.requestId,
    userId: req.user?.userId || null
  }),
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => `${req.method} ${req.url} completed with status ${res.statusCode}`,
  customErrorMessage: (req, res, err) => `${req.method} ${req.url} failed with status ${res.statusCode}`
});

module.exports = httpLogger;
