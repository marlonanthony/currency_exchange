const User = require('./models/User')
const Pair = require('./models/Pair') 

const resolvers = {
    Query: {
        me: async (_, __, { req }) => {
            try {
                if(!req.session.userId) return null 
                const user = await User.findById(req.session.userId).populate('pairs') 
                return user 
            } catch (error) { throw error }
        },
        currencyPairInfo: async (_, {fc, tc}, { dataSources }) => {
            try {
                const currencyPairs = await dataSources.currencyAPI.getCurrencyPair(fc, tc)
                return currencyPairs
            } catch (error) { throw error }
        },
        findPair: async (_, { id }, { req }) => {
            try {
                const user = await User.findById(req.session.userId)
                const pair = await Pair.findById(id)
                if(!pair || pair.user.toString() !== user.id.toString()) { throw new Error('Invalid credentials!') }
                else { return pair }
            } catch (error) { throw error }
        },
        getPairs: async (_, __, { req }) => {
            try {
                const pairs = await Pair.find({ user: req.session.userId })
                if(!pairs.length) throw new Error('Nothing to show!')
                return [...pairs] 
            } catch (error) { throw error }
        }
    },

    Mutation: {
        register: async (_, { email, password, name }, { dataSources }) => {
            try {
                const newUser = await dataSources.userAPI.createNewUser({ email, password, name })
                if(newUser) return newUser
            } catch (error) { throw error }
        },
        login: async (_, { email, password }, { req, dataSources }) => {
            try {
                const user = await dataSources.userAPI.loginUser({ email, password, req })
                if(user) return user 
            } catch (error) { throw error }
        },
        openPosition: async (_, { pair, lotSize, openedAt, position }, { dataSources, req }) => {
            try {
                const open = await dataSources.userAPI.newPosition({ pair, lotSize, openedAt, position, req })
                return open 
            } catch (error) { throw error }
        },
        closePosition: async(_, { id, closedAt }, { dataSources, req }) => {
            try {
                const close = await dataSources.userAPI.exitPosition({ id, closedAt, req })
                return close 
            } catch (error) { throw error }
        }
    }
}

module.exports = resolvers