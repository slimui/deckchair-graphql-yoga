const { GraphQLServer, PubSub } = require('graphql-yoga')
const healthz = require('./healthz')

module.exports = ({ typeDefs, resolvers, directiveResolvers }) => {
  const pubsub = new PubSub()
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    directiveResolvers,
    context: { pubsub }
  })

  // Healthcheck endpoint
  server.get('/healthz', healthz)

  return server
}
