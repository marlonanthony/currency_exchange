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

  async loginUser({ email, password, req }) {
    try {
      if (!isEmail.validate(email)) { throw new Error('Invalide Email') }
      const user = await User.findOne({ email }) 
      if(!user) { throw new Error('Email or password is incorrect!') }
      const isEqual = await bcrypt.compare(password, user.password)
      if(!isEqual) { throw new Error('Email or password is incorrect!') }
      req.session.userId = user.id 
      return user 
    } catch (error) {
      console.log(error) 
      throw error 
    }
  }
}

module.exports = UserAPI