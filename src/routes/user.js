'use strict';

const Users = require('../models/userSchema');
const bcrypt = require('bcrypt');
const auth = require('../auth/basicAuth');

const express = require('express');
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = new Users(req.body);
    const record = await user.save(req.body)
    res.status(200).json(record);
  } catch (error) { console.error(error); res.status(403).send("Error creating User"); }
});

userRouter.post('/signin', auth, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = userRouter;
