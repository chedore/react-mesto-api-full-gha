require('dotenv').config();
const process = require('process');
// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
// const cors = require('./middlewares/cors');
const cors = require('cors')
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(helmet());
// app.use(cors);

// const allowedCors = [
//   'https://api.svetlana.prozhirova.nomoreparties.co',
//   'http://api.svetlana.prozhirova.nomoreparties.co',
//   'http://localhost:3000',
//   'http://localhost:3001'
// ];

// app.use(cors({
//   origin: allowedCors,
//   credentials: true,
// }));

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mydb1', {});

app.use('/', router);

// обработчик ошибок celebrate
app.use(errors());

app.use(errorLogger);

// централизованный обработчик ошиибок
app.use(errorHandler);

// обработчик не учтенных ошибок
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
