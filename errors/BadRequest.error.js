import CustomAPIError from './CustomAPI.error.js';
import { StatusCodes } from 'http-status-codes';

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
