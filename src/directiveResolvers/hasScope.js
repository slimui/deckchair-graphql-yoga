const defaultArgs = {
  any: false
}

module.exports = (next, source, { scope, any } = defaultArgs, { user }) => {
  const testMethod = any ? 'some' : 'every'

  if (user && scope[testMethod](value => user.scopes.indexOf(value) >= 0)) {
    return next()
  }

  throw new Error(`Scope\\s required: ${scope.join(', ')}`)
}
