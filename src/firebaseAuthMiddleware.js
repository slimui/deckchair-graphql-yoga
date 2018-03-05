module.exports = auth => async (request, response, next) => {
  try {
    const { authorization } = request.headers
    if (authorization) {
      const token = authorization.split(' ')
      const decodedToken = await auth.verifyIdToken(token[1])
      request.user = decodedToken
      next()
    } else {
      next()
    }
  } catch (error) {
    request.user = undefined
    next()
  }
}
