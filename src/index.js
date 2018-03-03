const createServer = require('./createServer')
const typeDefs = 'schema.graphql'
const resolvers = require('./resolvers')
const directiveResolvers = require('./directiveResolvers')

const port = process.env.PORT || 4000
const debug = process.env.DEBUG || false
const playground = process.env.PLAYGROUND || false
const validationRules = []

const server = createServer({ typeDefs, resolvers, directiveResolvers })

const options = {
  port,
  tracing: true,
  cacheControl: true,
  debug,
  playground,
  validationRules
}

// Start the server
server.start(options, ({ port }) =>
  console.log(`Server is running on port ${port}`)
)
