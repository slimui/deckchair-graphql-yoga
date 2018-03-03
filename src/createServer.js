const { GraphQLServer, PubSub } = require('graphql-yoga')
const healthz = require('./healthz')

module.exports = ({ typeDefs, resolvers, directiveResolvers, context }) => {
  const pubsub = new PubSub()
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    directiveResolvers,
    context: { pubsub, ...context }
  })

  // Healthcheck endpoint
  server.get('/healthz', healthz)

  return server
}
