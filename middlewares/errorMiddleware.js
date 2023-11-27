const { CustomAPIError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError){
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err });
};

module.exports = errorHandler;
