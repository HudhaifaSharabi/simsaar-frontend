import { Tajawal } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.css'
import "@/assets/scss/style.scss"
import "@/assets/css/materialdesignicons.min.css"
import { DataProvider } from '@/context/DataContext';

const league = Tajawal({ 
  subsets: ['latin'],
  weight: ['300','500'],
  variable: '--font-league',
 })

export const metadata = {
  title: 'سمسار',
  description: 'سمسار',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={league.variable}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  )
}
