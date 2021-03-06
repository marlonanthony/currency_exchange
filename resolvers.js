const User = require('./models/User') 

const resolvers = {
    Query: {
        me: async (_, __, { dataSources, req }) => {
            try {
                const user = await dataSources.userAPI.getMe({ req })
                return user
            } catch (error) { throw error }
        },
        findPair: async (_, { id }, { dataSources, req }) => {
            try {
                const foundPair = await dataSources.userAPI.getPair({ id, req })
                return foundPair
            } catch (error) { throw error }
        },
        getPairs: async (_, __, { dataSources, req }) => {
            try {
                const foundPairs = await dataSources.userAPI.findPairs({ req })
                return [...foundPairs]
            } catch (error) { throw error }
        },
        currencyPairInfo: async (_, {fc, tc}, { dataSources }) => {
            try {
                const currencyPairs = await dataSources.currencyAPI.getCurrencyPair(fc, tc)
                return currencyPairs
            } catch (error) { throw error }
        },
        monthlyTimeSeries: async (_, { fc, tc }, { dataSources }) => {
            try {
                const timeSeries = await dataSources.currencyAPI.getMonthlyTimeSeries(fc, tc)
                return timeSeries
            } catch (error) { throw error }
        }
    },

    Mutation: {
        register: async (_, { email, password, name }, { dataSources }) => {
            try {
                const newUser = await dataSources.userAPI.createNewUser({ email, password, name })
                return newUser
            } catch (error) { throw error }
        },
        login: async (_, { email, password }, { req, dataSources }) => {
            try {
                const user = await dataSources.userAPI.loginUser({ email, password, req })
                return user 
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
        },
        logout: async (_, __, { req }) => {
            try { req.session.destroy(() => false) } 
            catch (error) { throw error }
        },
        addFunds: async (_, { amount }, { req }) => {
            try {
                const user = await User.findById(req.session.userId)
                if(user) user.bankroll += amount 
                const savedUser = await user.save()
                const success = true
                const messege = `Congrats ${savedUser.name} you've added ${amount} to your bankroll!`
                return { bankroll: savedUser.bankroll, success, messege } 
            } catch (error) { throw error }
        }
    }
}

module.exports = resolvers