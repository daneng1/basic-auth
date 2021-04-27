const express = require('express');
const app = express();

const userRoutes = require('./routes/user.js');
const logger = require('./auth/logger.js');

const notFound = require('./error-handlers/404.js');
const error = require('./error-handlers/500.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(logger);
app.use(userRoutes);

app.use('*', notFound);
app.use(error);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`server up on ${port}`));
  }
}
