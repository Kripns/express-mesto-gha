import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
// import isURL from 'validator/lib/isURL';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    // required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    // required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // required: true,
    // validate: {
    //   validator: (v) => isURL(v),
    //   message: 'Неправильныая ссылка на аватар',
    // },
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
  },
});

// eslint-disable-next-line arrow-body-style
userSchema.statics.findUserByCredentials = (email, password) => {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
