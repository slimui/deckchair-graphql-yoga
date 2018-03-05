module.exports = {
  isAuthenticated: (next, source, args, context) => {
    if (context.user) {
      return next()
    }

    throw new Error('Authentication is required')
  },
  hasScope: (next, source, { scope }, context) => {
    return next()
  }
}
