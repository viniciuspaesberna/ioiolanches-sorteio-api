import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../lib/prisma'

export const getRedeemedCoupons = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/coupons',
    {
      schema: {
        summary: 'Listar cupons resgatados',
        tags: ['Coupons'],
        response: {
          200: z.object({
            coupons: z.array(
              z.object({
                id: z.string().uuid(),
                value: z.string(),
                clientId: z.string().uuid(),
                redeemed: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
                client: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  phone: z.string(),
                }),
              }),
            ),
          }),
        },
      },
    },
    async () => {
      const coupons = await prisma.coupon.findMany({
        where: {
          redeemed: true,
        },
        include: {
          client: true,
        },
      })

      return { coupons }
    },
  )
}
