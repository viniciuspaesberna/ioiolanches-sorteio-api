import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../lib/prisma'
import { generateCouponCode } from '../../utils/generate-coupon-code'
import { auth } from '../middlewares/auth'

export const createCoupon = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/coupons',
      {
        schema: {
          summary: 'Criar cupom',
          tags: ['Coupons'],
          response: {
            201: z.object({
              coupon: z.object({
                code: z.string(),
                createdAt: z.date(),
              }),
            }),
          },
          security: [{ bearerAuth: [] }],
        },
      },
      async () => {
        const code = await generateCouponCode()

        const coupon = await prisma.coupon.create({
          data: {
            code,
          },
          select: {
            code: true,
            createdAt: true,
          },
        })

        return { coupon }
      },
    )
}
