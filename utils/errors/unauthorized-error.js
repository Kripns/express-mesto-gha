/* eslint-disable import/extensions */
import { UNAUTHORIZED_ERROR_CODE } from '../errorCodes.js';

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

export default UnauthorizedError;
