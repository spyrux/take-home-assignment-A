import fastify from 'fastify'
import cors from '@fastify/cors'

import formDataRoutes from './routes/form_data'
import queryRoutes from './routes/query'
import errorHandler from './errors'

function build(opts = {}) {
  const app = fastify(opts)

  app.register(cors, {
    origin: 'https://playful-truffle-af381c.netlify.app',
  })

  app.register(formDataRoutes, { prefix: '/form-data' })
  app.register(queryRoutes, { prefix: '/query' })
  app.setErrorHandler(errorHandler)

  return app
}
export default build
