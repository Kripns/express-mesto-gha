/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import UnauthorizedError from '../utils/errors/unauthorized-error.js';

// eslint-disable-next-line function-paren-newline
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: /^https?:\/\/(www\.)?[\w\-_~]+\.[\w\-_~]+[\w\-.~:/?#[\]@!$&'()*+,;=]*#?/i,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
              }
              return user;
            });
        });
    },
  },
},
);

export default mongoose.model('user', userSchema);
