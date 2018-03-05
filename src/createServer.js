const { GraphQLServer } = require('graphql-yoga')
const healthz = require('./healthz')

module.exports = ({ typeDefs, resolvers, directiveResolvers, context }) => {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    directiveResolvers,
    context
  })

  // Healthcheck endpoint
  server.get('/healthz', healthz)

  return server
}
