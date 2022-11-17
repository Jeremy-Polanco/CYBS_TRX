import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.number === 2627) {
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.message = `Transacción con el id: ${
        err.message.split('(')[1].split(')')[0]
      } ya existe.`);
  }

  return res.status(defaultError.statusCode).json({
    err,
  });
};

export default errorHandlerMiddleware;
