import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export const createCoupon = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/coupons',
    {
      schema: {
        summary: 'Criar cupom',
        tags: ['Coupons'],
      },
    },
    async () => {},
  )
}
