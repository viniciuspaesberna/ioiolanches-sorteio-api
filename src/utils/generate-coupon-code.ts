import { prisma } from '../lib/prisma'

export async function generateCouponCode(length = 6): Promise<string> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  try {
    const existingCoupon = await prisma.coupon.findUnique({
      where: {
        code: result,
      },
    })

    if (existingCoupon) {
      console.log('coupon already exists', result)
      return generateCouponCode(length)
    }

    return result
  } catch (error) {
    console.log('Error checking coupon existence:', error)
    throw error
  }
}
