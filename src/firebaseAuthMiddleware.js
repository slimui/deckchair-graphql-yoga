module.exports = auth => async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const token = authorization.split(' ')
      const decodedToken = await auth.verifyIdToken(token[1])
      req.user = decodedToken
      next()
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    req.user = undefined
    next()
  }
}
