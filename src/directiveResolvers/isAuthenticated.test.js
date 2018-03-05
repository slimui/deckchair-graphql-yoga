const isAuthenticated = require('./isAuthenticated')

let next = undefined
let context = undefined

beforeEach(() => {
  next = jest.fn()
  context = {
    user: {
      name: 'test'
    }
  }
})

test('calls next if user found on context', () => {
  isAuthenticated(next, {}, {}, context)
  expect(next).toBeCalled()
})

test('throws an error if no user found on context', () => {
  expect(() => {
    isAuthenticated(next, {}, {}, {})
  }).toThrow()
})
