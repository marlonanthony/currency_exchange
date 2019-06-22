const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`
    type User {
        id: ID!
        email: String!
        name: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        register(email: String!, password: String!, name: String!): Boolean!
        login(email: String!, password: String!): User
    }
`