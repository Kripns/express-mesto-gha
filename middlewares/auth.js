/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/unauthorized-error.js';
import secretKey from '../utils/secretKey.js';

export default function auth(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
}
