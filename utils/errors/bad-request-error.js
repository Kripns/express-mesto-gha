/* eslint-disable import/extensions */
import { BAD_REQUEST_ERROR_CODE } from '../errorCodes.js';

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}

export default BadRequestError;
