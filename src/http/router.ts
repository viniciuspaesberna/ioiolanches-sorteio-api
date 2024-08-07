import { FastifyInstance } from 'fastify'

import { createCoupon } from './routes/create-coupon'
import { getRedeemedCoupons } from './routes/get-redeemed-coupons'
import { redeemCoupon } from './routes/redeem-coupon'

export const router = async (app: FastifyInstance) => {
  app.register(getRedeemedCoupons)
  app.register(createCoupon)
  app.register(redeemCoupon)
}
