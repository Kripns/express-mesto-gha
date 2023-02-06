/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/unauthorized-error.js';
import secretKey from '../utils/secretKey.js';

// eslint-disable-next-line consistent-return
export default function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
}
