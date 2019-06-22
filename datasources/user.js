const { DataSource } = require('apollo-datasource')
const isEmail = require('isemail')
const bcrypt = require('bcryptjs')

// const keys = require('../config/keys')
const User = require('../models/User') 
// const Pair = require('../models/Pair') 

class UserAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {
    this.context = config.context
  }

  async createNewUser({ email, password, name }) {
    if(!isEmail.validate(email)) { throw new Error('Invalide Email') }
      const existingUser = await User.findOne({ email })
      if(existingUser) { throw new Error('User already exists') }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await new User({
        name,
        email,
        password: hashedPassword
      })
      await user.save()
      return true 
    }
}

module.exports = UserAPI