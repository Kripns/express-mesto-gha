/* eslint-disable import/extensions */
import { FORBIDDEN_ERROR_CODE } from '../errorCodes.js';

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

export default ForbiddenError;
