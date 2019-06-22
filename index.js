const { ApolloServer } = require('apollo-server-express')
const express = require('express') 
const { typeDefs } = require('./typeDefs') 
const { resolvers } = require('./resolvers') 
const mongoose = require('mongoose') 
const session = require('express-session')

const { secret } = require('./config/keys')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
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
.connect(`mongodb+srv://marlon:marlon123456@cluster0-nqgpm.mongodb.net/graphqlauth?retryWrites=true&w=majority`)
.then(() => app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})).catch(err => console.log(err)) 