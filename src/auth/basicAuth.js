'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/userSchema.js');

module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop();  
  let decodedString = base64.decode(encodedString); 
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { 
    res.status(403).send("Invalid Login"); 
  } next();

};
