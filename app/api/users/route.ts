import { Webhook, WebhookVerificationError } from 'svix'
import { UserCreatedWebhook } from '@/types'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)

    const requestData = await req.json()

    const result = webhook.verify(JSON.stringify(requestData), {
      'svix-id': req.headers.get('svix-id') ?? '',
      'svix-signature': req.headers.get('svix-signature') ?? '',
      'svix-timestamp': req.headers.get('svix-timestamp') ?? ''
    }) as UserCreatedWebhook

    const userData = {
      id: result.data.id,
      imageUrl: result.data.image_url,
      email: result.data.email_addresses[0].email_address,
      firstName: result.data.first_name,
      lastName: result.data.last_name
    }

    await db.user.create({
      data: {
        email: userData.email,
        userId: userData.id,
        imageUrl: userData.imageUrl,
        name: [userData.firstName, userData.lastName].filter(n => !!n).join(' ')
      }
    })

    if (process.env.NODE_ENV !== 'production') {
      console.info('new user has been created')
      console.info(userData)
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return new NextResponse('Invalid request', { status: 405 })
    }

    return new NextResponse('Internal Error', { status: 500 })
  }
}
