const bcrypt = require('bcryptjs')
const isEmail = require('isemail')
const User = require('./models/User')
const Pair = require('./models/Pair') 

const resolvers = {
    Query: {
        me: async (_, __, { req }) => {
            if(!req.session.userId) return null 
            const user = await User.findById(req.session.userId) 
            return user 
        },
        currencyPairInfo: async (_, {fc, tc}, { dataSources }) => {
            const currencyPairs = await dataSources.currencyAPI.getCurrencyPair(fc, tc)
            return currencyPairs
        }
    },

    Mutation: {
        register: async (_, { email, password, name }, { dataSources }) => {
            try {
                const newUser = await dataSources.userAPI.createNewUser({ email, password, name })
                if(newUser) return newUser
            } catch (error) {
                console.log(error) 
                throw error 
            }
        },
        login: async (_, { email, password }, { req }) => {
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
}

module.exports = resolvers