const firebaseAuthMiddleware = require('./firebaseAuthMiddleware')

let auth = undefined

const user = {
  name: 'John'
}

beforeEach(() => {
  auth = {
    verifyIdToken: jest.fn().mockImplementation(() => {
      return Promise.resolve(user)
    })
  }
})

test('sets user on request and calls next when authorization header is set', async () => {
  const token = '12345testing'
  const middleware = firebaseAuthMiddleware(auth)

  const req = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const next = jest.fn()
  await middleware(req, {}, next)

  expect(auth.verifyIdToken).toBeCalledWith(token)
  expect(next).toBeCalled()
  expect(req.user).toBe(user)
})

test('calls next if no authorization header is present', async () => {
  const req = { headers: {} }
  const middleware = firebaseAuthMiddleware(auth)
  const next = jest.fn()

  await middleware(req, {}, next)
  expect(next).toBeCalled()
})
