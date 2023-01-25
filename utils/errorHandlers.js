/* eslint-disable import/extensions */
import {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} from './errorCodes.js';

export function handleBadRequestError(res) {
  res
    .status(BAD_REQUEST_ERROR_CODE)
    .send({ message: 'Переданы некорректные данные' });
}

export function handleNotFoundError(res, message) {
  res.status(NOT_FOUND_ERROR_CODE).send({ message });
}

export function handleDefaultError(res) {
  res
    .status(DEFAULT_ERROR_CODE)
    .send({ message: 'На сервере произошла ошибка' });
}
