import { computeMessage } from '../functions'

function routes (app) {
  app.get('/hello', (req, res) => {
    res.status(200).send({
      success: 'true',
      data: 'Hello kind',
    })
  })

  app.post('/kind', async (req, res) => {
    const { message } = req.body

    const data = await computeMessage(message)
    res.status(200).send({
      success: true,
      data: data,
    })
  })

  app.get('*', function (req, res) {
    res.status(404).send('Be kind!')
  })
}

export default routes
