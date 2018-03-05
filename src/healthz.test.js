const healthz = require('./healthz')

test('responds with correct statusCode and body', () => {
  const req = {}
  const status = jest.fn()
  const send = jest.fn()

  const res = {
    status: status.mockImplementation(() => {
      return { send }
    })
  }

  healthz(req, res)
  expect(status).toBeCalledWith(200)
  expect(send).toBeCalledWith('ok')
})
