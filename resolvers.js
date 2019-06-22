const User = require('./models/User')
// const Pair = require('./models/Pair') 

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
        login: async (_, { email, password }, { req, dataSources }) => {
            try {
                const user = await dataSources.userAPI.loginUser({ email, password, req })
                if(user) return user 
            } catch (error) { 
                console.log(error) 
                throw error 
            }
        },
        openPosition: async (_, { pair, lotSize, openedAt }, { dataSources, req }) => {
            try {
                const open = await dataSources.userAPI.newPosition({ pair, lotSize, openedAt, req })
                return open 
            } catch (error) {
                console.log(error) 
                throw error 
            }
        }
    }
}

module.exports = resolvers