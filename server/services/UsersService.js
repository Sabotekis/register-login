const bcrypt = require('bcrypt');
const User = require('../models/users.model');

class UsersService {
  static async register({ username, email, password }) {
    username = username.toLowerCase();
    email = email.toLowerCase();
  
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });
  
    if (existingUser) throw new Error('Username or email already registered');
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({ username, email, password: hashedPassword });
  
    await newUser.save();
  
    return newUser;
  }
}

module.exports = UsersService;