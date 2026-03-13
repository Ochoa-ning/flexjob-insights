import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '灵活用工资讯 - FlexJob Insights',
  description: '灵活用工行业资讯聚合平台，帮你快速获取最新行业动态',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main className="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
