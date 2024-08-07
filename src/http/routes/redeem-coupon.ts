import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

const webBaseUrl = process.env.WEB_BASE_URL || 'http://localhost:3000'

export const redeemCoupon = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/coupons/redeem',
    {
      schema: {
        summary: 'Resgatar cupom',
        tags: ['Coupons'],
        body: z.object({
          code: z.string(),
          clientName: z.string().min(3),
          clientPhone: z.string().min(11).max(11),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { code, clientName, clientPhone } = request.body

      const coupon = await prisma.coupon.findUnique({
        where: {
          code,
        },
      })

      if (!coupon) {
        throw new BadRequestError('Coupon not found')
      }

      if (coupon.redeemed) {
        return reply.redirect(webBaseUrl)
      }

      const client = await prisma.client.findUnique({
        where: {
          phone: clientPhone,
        },
      })

      await prisma.coupon
        .update({
          where: {
            code,
          },
          data: {
            redeemed: true,
            updatedAt: new Date(),
            client: client
              ? {
                  connect: {
                    id: client.id,
                  },
                }
              : {
                  create: {
                    name: clientName,
                    phone: clientPhone,
                  },
                },
          },
        })
        .catch((error) => {
          console.log(error)

          throw new Error('[Coupon redeem]: Error while updating coupon')
        })

      return null
    },
  )
}
