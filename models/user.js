import mongoose from 'mongoose';
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

export default mongoose.model('user', userSchema);
