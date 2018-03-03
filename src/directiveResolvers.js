module.exports = {
  isAuthenticated: (next, source, args, context) => {
    return next()
  },
  hasScope: (next, source, { scope }, context) => {
    return next()
  }
}
