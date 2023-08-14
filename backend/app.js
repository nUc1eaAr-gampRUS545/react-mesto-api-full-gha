/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000, DB_LINK } = process.env;
const app = express();
// eslint-disable-next-line import/newline-after-import
const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');

const { createUser, login } = require('./controllers/users');
const { authentiacateUser } = require('./middlewares/auth');
const { validateCreateUser, validateUserLogin } = require('./middlewares/validateJoi');
const NotFoundError = require('./utils/errors/not-found-error');
const { errorHandler } = require('./utils/errors/errorHandler');

app.use(bodyParser.json());
app.use(cookies());
app.use(cors({ origin: 'https://mesto-react-app.nomoreparties.co', credentials: true }));
app.use(express.json());

mongoose.connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: false });

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateUserLogin, login);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use('/users', authentiacateUser, routesUsers);
app.use('/cards', authentiacateUser, routesCards);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(authentiacateUser, (_req, _res, next) => next(new NotFoundError('Cтраница не найдена')));
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Сервер запущен');
});
