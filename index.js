'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const server = require('./src/server.js');

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGODB_URI, options)
.then(() => {
  server.start(PORT);
})
.catch(error => console.log('Could not start server', error.message));
