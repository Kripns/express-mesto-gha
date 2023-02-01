/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { handleUnauthorizedError } from '../utils/errorHandlers.js';
import secretKey from '../utils/secretKey.js';

// eslint-disable-next-line consistent-return
export default function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleUnauthorizedError;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return handleUnauthorizedError(res);
  }
  req.user = payload;
  next();
}
