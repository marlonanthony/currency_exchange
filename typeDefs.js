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

    type Query {
        me: User
        currencyPairInfo(fc: String, tc: String): DefaultPairDisplay!
    }

    type Mutation {
        register(email: String!, password: String!, name: String!): Boolean!
        login(email: String!, password: String!): User
    }
`