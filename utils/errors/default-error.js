/* eslint-disable import/extensions */
import { DEFAULT_ERROR_CODE } from '../errorCodes.js';

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT_ERROR_CODE;
  }
}

export default DefaultError;
