const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
    type User {
        id: ID!
        email: String!
        name: String!
        bankroll: Float!
        pairs: [Pair]
        createdAt: String 
        updatedAt: String 
    }

    type Pair {
        id: ID!
        user: ID!
        pair: String!
        lotSize: Int!
        position: String!
        openedAt: Float!
        closedAt: Float
        pipDif: Float
        profitLoss: Float
        open: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type DefaultPairDisplay {
        fromCurrency: String! 
        fromCurrencyName: String 
        toCurrency: String! 
        toCurrencyName: String 
        exchangeRate: String! 
        lastRefreshed: String
        timeZone: String 
        bidPrice: String 
        askPrice: String
    }

    type PairUpdateResponse {
        success: Boolean!
        message: String!
        pair: Pair!
    }

    type AddFundsResponse {
        success: Boolean!
        messege: String!
        bankroll: Int! 
    }

    type TimeSeries {
        timesArray: [String]!
        valuesArray: [String]!
    }


    type Query {
        me: User
        currencyPairInfo(fc: String, tc: String): DefaultPairDisplay!
        findPair(id: ID!): Pair!
        getPairs: [Pair!]
        monthlyTimeSeries(fc: String, tc: String): TimeSeries!
    }

    type Mutation {
        register(email: String!, password: String!, name: String!): Boolean!
        login(email: String!, password: String!): User
        openPosition(pair: String!, lotSize: Int, openedAt: Float!, position: String!): PairUpdateResponse!
        closePosition(id: ID!, closedAt: Float!): PairUpdateResponse!
        logout: Boolean
        addFunds(amount: Int!): AddFundsResponse!
    }
`