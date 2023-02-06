/* eslint-disable import/extensions */
import { NOT_FOUND_ERROR_CODE } from '../errorCodes.js';

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

export default NotFoundError;
