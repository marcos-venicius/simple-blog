export interface UserCreatedWebhook {
  data: {
    id: string
    email_addresses: Array<{ email_address: string }>
    first_name: string
    image_url: string
    last_name: string
  }
}
