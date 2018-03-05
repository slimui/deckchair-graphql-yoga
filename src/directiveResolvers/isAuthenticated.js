module.exports = (next, source, args, { user }) => {
  if (user) {
    return next()
  }

  throw new Error('Authentication required')
}
