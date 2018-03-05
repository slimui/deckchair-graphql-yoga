const path = require('path')
const admin = require('firebase-admin')
const firebaseAuthMiddleware = require('./firebaseAuthMiddleware')
const serviceAccount = require('../serviceAccount.json')
const createServer = require('./createServer')
const typeDefs = path.resolve('schema.graphql')
const resolvers = require('./resolvers')
const directiveResolvers = require('./directiveResolvers')

const port = process.env.PORT || 4000
const databaseName = process.env.DATABASE_NAME || 'deckchair-api'
const debug = process.env.DEBUG || false
const playground = process.env.PLAYGROUND || false
const validationRules = []

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${databaseName}.firebaseio.com`
})

const authMiddleware = firebaseAuthMiddleware(admin.auth())

const context = ({ request }) => {
  return { admin, user: request.user }
}

const server = createServer({
  typeDefs,
  resolvers,
  directiveResolvers,
  context
})

const options = {
  port,
  tracing: true,
  cacheControl: true,
  debug,
  playground,
  validationRules
}

server.use(authMiddleware)

// Start the server
server.start(options, ({ port }) =>
  console.log(`Server is running on port ${port}`)
)
