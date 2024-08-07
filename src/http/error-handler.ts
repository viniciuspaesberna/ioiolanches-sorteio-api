import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './_errors/bad-request-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _req, reply) => {
  console.log(error.message)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Error during validation',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  return reply
    .status(500)
    .send({ messagem: 'Internal server error, please try again later!' })
}
