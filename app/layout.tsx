import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/components/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Blog',
  description: 'Seu blog favorito'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html
        lang='pt-BR'
        suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            defaultTheme='light'
            attribute='class'
            storageKey='simple-blog-theme-configuration'
            enableSystem>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
