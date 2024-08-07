import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../_errors/unauthorized-error'

const apiSecret = process.env.API_SECRET

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    const headers = request.headers

    if (headers.authorization?.split(' ')[1] !== apiSecret) {
      throw new UnauthorizedError()
    }
  })
})
