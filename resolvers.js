const bcrypt = require('bcryptjs')
const User = require('./models/User')

module.exports.resolvers = {
    Query: {
        me: async (_, __, { req }) => {
            if(!req.session.userId) return null 
            const user = await User.findById(req.session.userId) 
            return user 
        }
    },

    Mutation: {
        register: async (_, { email, password, name }) => {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await new User({
                email,
                name,
                password: hashedPassword
            })
            const res = await user.save()
            return true 
        },
        login: async (_, { email, password }, { req }) => {
            const user = await User.findOne({ email }) 
            if(!user) { throw new Error('Email or password is incorrect!') }
            const isEqual = await bcrypt.compare(password, user.password)
            if(!isEqual) { throw new Error('Email or password is incorrect!') }
            req.session.userId = user.id 
            return user 
        }
    }
}