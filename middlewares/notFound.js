import { StatusCodes } from 'http-status-codes';

const notFoundMiddleware = async (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: 'Route not found',
  });
};

export default notFoundMiddleware;
