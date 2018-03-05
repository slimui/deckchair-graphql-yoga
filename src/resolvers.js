const pkg = require('../package.json')

module.exports = {
  Query: {
    version: () => pkg.version
  },
  Mutation: {
    verifyIdToken: async (parent, { token }, { admin }) => {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        console.log(decodedToken)
        return true
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  }
}
