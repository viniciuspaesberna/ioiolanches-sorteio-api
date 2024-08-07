import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export const redeemCoupon = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/coupons/redeem',
    {
      schema: {
        summary: 'Resgatar cupom',
        tags: ['Cupons'],
      },
    },
    async () => {},
  )
}
