const hasScope = require('./hasScope')

let next = undefined
let context = undefined

beforeEach(() => {
  next = jest.fn()
  context = {
    user: {
      scopes: ['read:comments', 'write:comments']
    }
  }
})

test('calls next if every required scope is set', () => {
  const args = { scope: ['read:comments', 'write:comments'] }
  hasScope(next, {}, args, context)

  expect(next).toBeCalled()
})

test('throws an error if not every required scope is set', () => {
  const next = jest.fn()
  const args = { scope: ['read:comments', 'delete:comments'] }

  expect(() => {
    hasScope(next, {}, args, context)
  }).toThrow()
})

test('calls next if some of the required scopes are set', () => {
  const args = { scope: ['read:comments', 'write:comments'], any: true }
  hasScope(next, {}, args, context)

  expect(next).toBeCalled()
})

test('throws an error if every required scope is not set', () => {
  const args = {
    scope: ['delete:comments', 'publish:comments']
  }

  expect(() => {
    hasScope(next, {}, args, context)
  }).toThrow()
})
