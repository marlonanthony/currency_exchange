const { ApolloServer } = require('apollo-server-express')
const express = require('express') 
const { typeDefs } = require('./typeDefs') 
const resolvers = require('./resolvers') 
const mongoose = require('mongoose') 
const session = require('express-session')
// const User = require('./models/User')
const CurrencyAPI = require('./datasources/currencies')
const UserAPI = require('./datasources/user')
const { secret, mongoUsername, mongoPassword }  = require('./config/keys')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        currencyAPI: new CurrencyAPI(),
        userAPI: new UserAPI() 
    }),
    context: ({ req }) => ({ req }),
    engine: {
        apiKey: process.env.ENGINE_API_KEY 
    },
})

const app = express() 

app.use(session({
    secret,
    resave: false,
    saveUninitialized: false
}))

server.applyMiddleware({ 
    app, 
    cors: {
        credentials: true,
        origin: 'http://localhost:3000'
    }
})

mongoose
.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0-nqgpm.mongodb.net/graphqlauth?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then(() => app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})).catch(err => console.log(err))